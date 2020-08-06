/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
// action - create
create: async function (req, res) {

    if (req.method == "GET")
        return res.view('person/create');

    if (!req.body.Person)
        return res.badRequest("Form-data not received.");

    await Person.create(req.body.Person);

    return res.ok("Successfully created!");
},

json: async function (req, res) {

    var persons = await Person.find();

    return res.json(persons);
},

  //action - index
  index: async function(req,res){
    var models = await Parent.find({
      where:{highlighted:'true'},
      limit:4,
      sort:'updatedAt DESC'
    });
    return res.view('arent/index', {persons : models});
  },

// action - view
view: async function (req, res) {

    var model = await Person.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('person/view', { person: model });

},

// action - delete 
delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var models = await Person.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();

    return res.ok("person Deleted.");

},

// action - update
update: async function (req, res) {

    if (req.method == "GET") {

        var model = await Person.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('person/update', { person: model });

    } else {

        if (!req.body.Person)
            return res.badRequest("Form-data not received.");

        var models = await Person.update(req.params.id).set({
            name: req.body.Person.name,
            age: req.body.Person.age
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    }
},


//action - details
details: async function(req,res){

    var model = await Person.findOne(req.params.id);

    if(!model) {return res.notFound();}

    var thatPerson = await Person.findOne(req.params.id).populate('rentedBy');

    var uidList = new Array();
    var users;
    if(thatPerson) {
      users = thatPerson.rentedBy;
      users.forEach(element => {
        uidList.push(element.id);
      });
    }

    return res.view('Person/details', {person : model, uidList:uidList, users:users});
  },

// search function
search: async function (req, res) {

    const qName = req.query.name || "";
    const qAge = parseInt(req.query.age);

    if (isNaN(qAge)) {

        var models = await Person.find({
            where: { name: { contains: qName } },
            sort: 'name'
        });

    } else {

        var models = await Person.find({
            where: { name: { contains: qName }, age: qAge },
            sort: 'name'
        });

    }

    return res.view('person/index', { persons: models });
},
// action - paginate
paginate: async function (req, res) {

    const qPage = Math.max(req.query.page - 1, 0) || 0;

    const numOfItemsPerPage = 2;

    var models = await Person.find({
        limit: numOfItemsPerPage, 
        skip: numOfItemsPerPage * qPage
    });

    var numOfPage = Math.ceil(await Person.count() / numOfItemsPerPage);

    return res.view('person/paginate', { persons: models, count: numOfPage });
},

populate: async function (req, res) {

    var model = await Person.findOne(req.params.id).populate("worksFor");

    if (!model) return res.notFound();

    return res.json(model);

},






};

