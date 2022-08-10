const noteHandler = {};
const { Notes } = require('../db');


noteHandler.create = async (req, res) => {
  try {
    let newNote = await Notes.build(req.body).save();
    res.status(200).json(newNote);
  } catch (error) {
    res.status(500).send(error);
  }
}
noteHandler.read = async (req, res) => {
  console.log(`REQUEST BODY READ ${req.body}`);
  let records = null;
  let options = {};
  const id = req.params.id;
  try {
    if (id) {
      options['where'] = { id };
      records = await Notes.findOne(options);
    } else {
      records = await Notes.findAll(options);
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
}

noteHandler.update = async (req, res) => {
  const id = req.params.id;
  if (req.user?.role == 'admin' || req.user?.role == 'editor') {
    try {
      if (!id) throw new Error('No target ID');
      //const obj = req.body;
      let updatedContent = await Notes.update(req.body, { where: { id } });
      res.status(200).json(updatedContent);
    } catch (e) {
      res.status(500).send(e);

    }
  } else {
    res.status(500).send('You do not have access to this feature.')
  };

}
noteHandler.delete = async (req, res) => {
  let id = req.params.id;
  console.log('-------------------->', req.user);
  if (req.user?.role === 'admin') {
    try {
      if (!id) throw new Error('No target ID');
      //let target = await Notes.findOne({where: { id }});
      //if(req.user.username === target.author){
      await Notes.destroy({ where: { id } });
      res.status(200).send('successful delete')
      //} else {
      //throw new Error('That/s not your file!');
      //}
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    console.log("--------------------------->", req.user);
    res.status(401).send('You do not have access to this feature.')
  }

}
module.exports = noteHandler;