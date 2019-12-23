import models from '../../model/models';

export const index = async(req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).end();
  
  const users = await models.User.findAll({limit: limit});
  res.json(users);

  // res.json(users.slice(0, limit));
};

export const show = async(req, res) => {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();

  const user = await models.User.findOne({ where: {id}});
  if (!user) return res.status(404).end();

  res.json(user);
};

export const destroy = async(req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  await models.User.destroy({ where: {id} });
  res.status(204).end();
};

export const create = async(req, res) => {
  const name = req.body.name;
  if (!name) return res.status(404).end();

  try{
    const createdData = await models.User.create({name});
    res.status(201).json(createdData);
  } catch (err){
    const errStatusCode = (err.name === 'SequelizeUniqueConstraintError') ? 409 : 500;
    res.status(errStatusCode).end();
  }
};

export const update = async(req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();
  
  models.User.findOne({where :{id}})
  .then(user => {
    if (!user) return res.status(404).end();

    user.name = name;
    user.save()
      .then(_ => {
        res.json(user);
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError'){
          return res.status(409).end();
        }
        res.status(500).end();
      });
  });
  
};

