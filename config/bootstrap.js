/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {


  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;

  
  if (await Person.count() == 0) {

    await Person.createEach([
      { name: "Martin Choy", age: 23 },
      { name: "Kenny Cheng", age: 22 }
      // etc.
    ]);

}


if(await Person.count()>0){
  return generateUsers();
}

await Person.createEach([

  {createdAt:1571302609823,updatedAt:1571303614484,id:26,title:'杏花邨兩廳四房',          img:'https://ycdn.space/h/2019/12/006-balcones-residence-by-clayton-little-1050x700.jpg',estate:'Bel-Air Residence',bedrooms:3,gross:750,expected:4,highlighted:'true',rent:27000,latitude:'22.384722'  ,longitude:'114.198694'},
  {createdAt:1570956222896,updatedAt:1571340319285,id:27,title:'杏花邨翻新舊樓',          img:'https://ycdn.space/h/2019/12/003-balcones-residence-by-clayton-little-1050x721.jpg',estate:'Heng Fa Chuen',bedrooms:4,gross:1080,expected:6,highlighted:'false',rent:25500,latitude:'22.2756'  ,longitude:'114.2416'},
  {createdAt:1570955818028,updatedAt:1571340326297,id:28,title:'港運城超大豪宅',          img:'https://ycdn.space/h/2019/12/008-villa-atelier-darchitectes-associs-1050x702.jpg',estate:'Island Place',bedrooms:5,gross:1500,expected:5,highlighted:'false',rent:48000,latitude:'22.2909'  ,longitude:'114.2022'},

]);

return generateUsers();

  async function generateUsers(){

    if (await User.count()>0){
      return;
    }

    const hash = await sails.bcrypt.hash('123456', saltRounds);

    await User.createEach([
      {username:'Kang',password:hash, realname:'Jaw Chou',gender:'female',age:26,role:'user'},
      {username:'NIKE',password:hash, realname:'Eiwa Leung',gender:'female',age:34,role:'user'},
      {username:'adidas',password:hash, realname:'Hama Lo',gender:'female',age:24,role:'user'},
      {username:'anta',password:hash, realname:'Mike Cheung',gender:'male',age:21,role:'user'},
    ]);


    

    

  }


return;
};
