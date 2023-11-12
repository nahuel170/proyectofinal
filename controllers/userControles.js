const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const user = require('../models/userModels');
const { generarJWT } = require('../helpers/jwt');

const userRegistro = (req, res) => {
    res.render('registro');
};

const userLoginForm = (req, res) => {
    res.render('login');
};

const userCreate = async (req, res) => {
    const errors = validationResult(req);

    const { nombre, email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.json({
            data: 'errores en los datos'
        });
    };
    console.log(`1. email ${email}`);

    try {
        let usuario = await user.findOne({ email });

        console.log(`2. Usuario ${usuario}-${email}`);

        if (usuario) {
            return res.json({
                data: 'el email ya existe'
            });
        }
        usuario = new user(req.body);
        const salt = bcrypt.genSaltSync();
        console.log(`3. salt ${salt}`);

        console.log(`4. usuario: ${usuario}`);

        usuario.password = bcrypt.hashSync(password, salt);

        console.log(`5. usuario: ${usuario.password}`);

        await usuario.save();
        const token = await generarJWT(usuario.id, usuario.name);

        console.log(`6. token: ${token}`);
        return res.render('login');
    } catch (error) { }
};
const userLogin = async (req, res) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.json({
            data: 'errores en los datos'
        });
    };
    console.log(`1. email ${email}`);
    try {
        let usuario = await user.findOne({ email });

        console.log(`2. Usuario ${usuario}-${email}`);

        if (!usuario) { return res.render('registro'); }

        const match = await bcrypt.compare(password, usuario.password);
        console.log(`3. match:${match}`);
        if (match) {
            const token = await generarJWT(usuario.id, usuario.name);
            console.log(`4. token:${token}`);
        }
        if (usuario.email === 'admin@gmail.com') {
            return res.render('admin');
        } else {
            return res.render('index', { style: 'index.css' });
        }
    } catch (error) { }
    return res.json({
        data: 'error en la base de datos'
    });
};

const userUpdate = async (req, res) => {

    const id = req.params.id;

    try {
        const usuario = await user.findById(id);
        if (!usuario) {
            return res.json({
                data: 'el usuario no existe'
            });
        }

        const usuarioActualizado = { ...req.body };

        const actualizarUsuario = await user.findByIdAndUpdate(id, usuarioActualizado, { new: true });

        return res.json({
            ok: true,
            usuario: actualizarUsuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const userDelete = async (req, res) => {

    const id = req.params.id;

    try {
        const usuario = await user.findById(id);

        if (!usuario) {
            return res.json({
                data: 'el usuario no existe'
            });
        }

        await user.findByIdAndDelete(id);
        res.json({ ok: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const revalidarToken = async (req, res) => {
    const { uid, name, rol } = req;

    const token = await generarJWT(uid, name, rol);
    res.json({
        ok: true,
        token
    })
};
module.exports = {
    userRegistro,
    userLoginForm,
    userCreate,
    userLogin,
    userUpdate,
    userDelete,
    revalidarToken
};

