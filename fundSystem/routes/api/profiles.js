const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => {
    res.json({
        msg: 'profils works'
    });
});
//创建信息接口,为私有
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ProfileFields = {}
    if (req.body.type) ProfileFields.type = req.body.type;
    if (req.body.describe) ProfileFields.describe = req.body.describe;
    if (req.body.income) ProfileFields.income = req.body.income;
    if (req.body.expend) ProfileFields.expend = req.body.expend;
    if (req.body.cash) ProfileFields.cash = req.body.cash;
    if (req.body.remark) ProfileFields.remark = req.body.remark;

    new Profile(ProfileFields).save().then((profile) => {
        res.json(profile);
    })
});
//获取所有信息,私有
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then((profile) => {
        if (!profile) {
            return res.status(404).json('无内容');
        }
        res.json(profile);
    }).catch((err) => {
        res.status(404).json(err);
    })
});
//获取单个信息
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id }).then((profile) => {
        if (!profile) {
            return res.status(404).json('无内容');
        }
        res.json(profile);
    }).catch((err) => {
        res.status(404).json(err);
    })
});
//编辑信息接口，私有
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ProfileFields = {}
    if (req.body.type) ProfileFields.type = req.body.type;
    if (req.body.describe) ProfileFields.describe = req.body.describe;
    if (req.body.income) ProfileFields.income = req.body.income;
    if (req.body.expend) ProfileFields.expend = req.body.expend;
    if (req.body.cash) ProfileFields.cash = req.body.cash;
    if (req.body.remark) ProfileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: ProfileFields },
        { new: true }
    ).then((profile) => {
        res.json(profile);
    })
});
//删除接口
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id }).then((profile) => {
        profile.save().then((profile) => {
            res.json(profile)
        }).catch((err) => {
            res.status(404).json('删除失败');
        })
    })
});
module.exports = router; 