import models from '../../../models';

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

export const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const user = users.filter(user => user.id === id)[0];
  if (!user) return res.status(404).end();

  const isConflict = users.filter(user => user.name === name).length;
  if (isConflict) return res.status(409).end();

  user.name = name;
  res.json(user);
};

