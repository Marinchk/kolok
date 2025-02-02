const nodemailer = require("nodemailer");
const { products } = require("./products");

exports.sendEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Укажите email" });
    }

    if (!products.length) {
        return res.status(400).json({ message: "Список продуктов пуст" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "b71119876@gmail.com",
            pass: "hube zxaj ukui hcup",
        },
    });

    const mailOptions = {
        from: "b71119876@gmail.com",
        to: email,
        subject: "Ваш список покупок",
        text: products.map(p => `${p.name} - ${p.price} руб. - Купить через ${p.deadline} дн.`).join("\n"),
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email отправлен" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка отправки", error });
    }
};
