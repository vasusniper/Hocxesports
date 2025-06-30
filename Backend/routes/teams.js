const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const teamController = require('../controllers/teamController');
const { validateTeam } = require('../middlewares/teamValidate');

router.post(
  '/submit',
  upload.single('logo'),
  validateTeam,
  teamController.submitTeam
);

router.get('/data', teamController.getAllTeams);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
