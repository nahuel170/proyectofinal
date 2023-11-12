const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {
    userRegistro,
    userLoginForm,
    userCreate,
    userLogin,
    userUpdate,
    userDelete,
    revalidarToken  
} = require('../controllers/userControles');
const { validarJWT } = require('../middlewares/validarJWT');

router.get('/', userRegistro);

router.get('/login', userLoginForm);

router.get('/index', (req, res) => {
    res.render('index',{ 
        pageTitle: 'inicio',
        style: 'index.css',
     });
});
router.get('/propios', (req, res) => {
    res.render('propios',
    { pageTitle: 'mis diseños',
    style: 'diseños.css', 
  });
});
router.get('/precios', (req, res) => {
    res.render('precios',{
        pageTitle: 'precios',
        style: 'precios.css', 
     });
});
router.get('/turnos', (req, res) => {
    res.render('turnos',{ 
        pageTitle: 'turnos',
        style: 'turnos.css', 
     });
});

router.post('/',[
    check('nombre').isLength({min:4}),
    check('email').isEmail(),
    check('password').isLength({min:8})

]
,userCreate);

router.post('/login',[
    
    check('email').isEmail(),
    check('password').isLength({min:8})

]
,userLogin);

router.get('/renew',validarJWT, revalidarToken);

router.put('/update/:id', userUpdate);

router.delete('/delete/:id', userDelete);

module.exports = router;