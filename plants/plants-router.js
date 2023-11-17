import { Router } from 'express';
import { Plants } from './plants-model.js';

const router = Router();

router.get('/', (req, res) => {
  Plants.find()
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Failed to get plants.',
      });
    });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  Plants.findByUser(id)
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Plants.findById(id)
    .then((plant) => {
      return plant
        ? res.status(200).json(plant)
        : res
            .status(404)
            .json({ message: `Could not find plant with ID: ${id}.` });
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to get plant.' });
    });
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Plants.findById(id)
//     .then((plant) => {
//       res.status(200).json(plant);
//       res.status(404).json({
//         message: `Could not find plant with ID: ${id}.`,
//       });
//     })
//     .catch(() => {
//       res.status(500).json({
//         message: 'Failed to get plant.',
//       });
//     });
// });

// router.post('/', (req, res) => {
//   const { id } = req.params;
//   const newPlant = req.body;
//   Plants.add(newPlant, id)
//     .then((plant) => {
//       res.status(201).json({ created: plant });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err.message });
//     });
// });

router.post('/:userId', async (req, res) => {
  const { userId } = req.params; // Extract the user ID from the URL
  const newPlant = req.body;

  try {
    const addedPlant = await Plants.addPlantToUser(newPlant, userId);
    res.status(201).json({ created: addedPlant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Plants.findById(id)
    .then((plant) => {
      plant
        ? Plants.update(id, changes).then((updated) => {
            res.status(200).json({
              message: `successfully updated plant ID: ${id}`,
            });
          })
        : res.status(404).json({
            errorMessage: 'plant not found',
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: error.message,
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Plants.remove({ id })
    .then((deleted) => {
      res
        .status(200)
        .json({ message: `plant ID: ${id} has been removed`, deleted });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: `cannot remove plant by ID: ${id}` });
    });
});

export default router;
