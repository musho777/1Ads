import { Router } from 'express';
import { body, query } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { CampaignController } from '../controllers/campaignController';
import { PaginationParams } from '../types/pagination';

const router = Router();
const campaignController = new CampaignController();

// Get all campaigns with pagination and filtering
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['active', 'paused', 'completed', 'pending']),
  query('minCpm').optional().isFloat({ min: 0 }),
  validateRequest,
], campaignController.getCampaigns);

// Get campaign by ID
router.get('/:id', campaignController.getCampaign);

// Create new campaign
router.post('/', [
  body('name').isString().trim().notEmpty(),
  body('budget').isFloat({ min: 0 }),
  body('cpm').isFloat({ min: 0 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('adContent').isObject(),
  body('adContent.title').isString().trim().notEmpty(),
  body('adContent.description').isString().trim().notEmpty(),
  body('adContent.imageUrl').isURL(),
  body('adContent.targetUrl').isURL(),
  validateRequest,
], campaignController.createCampaign);

// Update campaign
router.put('/:id', [
  body('name').optional().isString().trim().notEmpty(),
  body('budget').optional().isFloat({ min: 0 }),
  body('cpm').optional().isFloat({ min: 0 }),
  body('status').optional().isIn(['active', 'paused', 'completed']),
  body('startDate').optional().isISO8601(),
  body('endDate').optional().isISO8601(),
  validateRequest,
], campaignController.updateCampaign);

// Delete campaign
router.delete('/:id', campaignController.deleteCampaign);

// Get campaign statistics
router.get('/:id/stats', campaignController.getCampaignStats);

export const campaignRoutes = router;