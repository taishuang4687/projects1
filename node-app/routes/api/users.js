const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');//用于加密
const jwt = require('jsonwebtoken');
const passport = require('passport');
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const User = require('../../models/User');
router.get('/test',(req,res)=>{
    res.json({msg:'login words'})
})
//注册
router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email}).then((user)=>{
        if(user){
            return res.status(400).json({email:"邮箱已存在"})
        }else{
            const avatar=gravatar.url('req.body.email',{s:'200',r:'pg',d:'mm'});
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            })
            //用于加密密码
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user)=>{
                        return res.json(user);
                    }).catch((err)=>{
                        console.log(err);
                    })
                })
            })
        }
    })
})
//登录
//@desc 返回token jwt passport
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email}).then((user)=>{
        if(!user){
            return res.status(404).json({email:'用户不存在!'});
        }
        //用于匹配密码是否输入正确
        bcrypt.compare(password,user.password).then((isMatch)=>{
            if(isMatch){
                const rule = {id:user.id,name:user.name}
                jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    if(err) throw err;
                    res.json({
                        success:true,
                        token:"Bearer "+token
                    })
                })
                // res.json({msg:'success'});
            }else{
                return res.status(400).json({password:'密码错误'});
            }
        })
    })
})
//当前用户想要请求的一些数据信息，是私密的（get）
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({msg:'success'});
})
module.exports = router;