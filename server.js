const express = require('express')
const bodyParser= require('body-parser')
var server = express()
server.set('view engine','ejs')

const mongodb = require('mongodb').MongoClient
var rubixDB
var members

mongodb.connect('mongodb+srv://dorin:dorin@cluster.fgr8o.mongodb.net',{useNewUrlParser: true, useUnifiedTopology: true},function(err,db){
    if(err) throw err
    else{
        console.log('Connected to the local Rubix Database')
        rubixDB = db.db('rubix')
        members = rubixDB.collection('team-members')
    }
})


server.use('/styles', express.static('styles'))
server.use('/res', express.static('res'))
server.use('/structs', express.static('structs'))
server.use('/scripts', express.static('scripts'))
server.use(bodyParser.urlencoded({ extended: true }));



function logger(req,res,next){
    console.log('REQUEST MADE AT  ['+ new Date().toLocaleTimeString()+ ']  FROM  [' + req.ip+']  FOR  [' + req.url + ']')  
    next()
}
server.get('/',logger,function(req,res){
    res.sendFile(__dirname +'/index.html')
    
})
server.get('/team',logger,function(req,res){
    var classes = rubixDB.collection('team-classes')
    members.find({}).toArray(function(err,membersData){
        if (err) throw err
        else{
            classes.find({}).sort({orderID:1}).toArray(function(error,classData){
                if (error) throw error
                else{
                    res.render('team.ejs',{
                        data: membersData,
                        roles: classData
                    })
                }   
            })
        }
   })
})
server.get('/events',logger,function(req,res){
    res.render('events.ejs')
})
server.get('/galery',logger,function(req,res){
    res.render('galery.ejs')
})
server.get('/resources',logger,function(req,res){
    res.render('resources.ejs')
})
server.get('/contact',logger,function(req,res){
    res.render('contact.ejs')
})
server.post('/contact',logger,function(req,res){
    var submitColl = rubixDB.collection('contact-submissions')
    
    submitColl.insertOne({
        email: req.body.email,
        title: req.body.title,
        message: req.body.message,
        date: new Date().toUTCString()
    },function(err,result){
        if(err) throw err
        else{
           res.redirect('/contact')
        }
    })
})
server.get('/team/:name',logger,function(req,res){
    members.findOne({shortID:req.params.name},function(err,member){
        if (!member) {
            res.send('This member has not been found')
        }
        else{
            var classes1 = rubixDB.collection('team-classes');
            classes1.findOne({_id:member.class},function(err2,memberClass){
                if(err2) throw err2;
                else{
                    var badges = rubixDB.collection('badges')
                    badges.find({},{projection:{_id:0}}).toArray(function(err3,badges){
                        if(err3) throw err3;
                        else{
                            var Badges = []
                            
                            var splitBadges = member.badges.split(' ')
                            splitBadges.forEach(function(memberbadge){
                                badges.forEach(function(badgeitem){
                                    if(memberbadge == badgeitem.id){
                                        Badges.push(badgeitem)
                                    }
                                })
                            })
                            res.render('profile.ejs',{member: member, Clasa:memberClass, badges: Badges })
                        }
                    })
                }
            })
            
        }
    })
})

server.listen(80,function(){
    console.log('Listening on port 80')
})
