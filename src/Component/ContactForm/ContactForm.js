import React from 'react'
import './ContactForm.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import emailjs from "emailjs-com"

const ContactForm = () => {
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_hl8losh','template_uovby0r',e.target,'kRmmE_FN69-XkGUuX').then(res=>{
            console.log(res);
            [... document.querySelectorAll(".contact-input")].map(index => index.value = "");
            document.querySelector(".contact-textarea").value="";
            document.querySelector(".alert-info").classList.add("active");
        }).catch(err=>{
            document.querySelector(".alert-danger").classList.add("active");
            console.log(err);
        });
    }
    return (
        <div className="contact-form-container">
            <h3 className="contact-heading-h3">Nếu bạn có bất cứ vấn đề gì</h3>
            <h1 className="contact-heading-h1">Liên hệ với chúng tôi qua Email!</h1>
            <form className="contact-form d-flex flex-column" onSubmit={sendEmail}>
                <input type="text" name="name" className="contact-input" placeholder="Họ tên" required/>
                <input type="text" name="number" className="contact-input" placeholder="Số điện thoại"/>
                <input type="email" name="user_email" className="contact-input" placeholder="Địa chỉ email" required/>
                <textarea name="message" className="contact-textarea" rows="5" placeholder="Lời nhắn của bạn" required></textarea>
                <button className="contact-btn d-flex align-items-center"><MailOutlineIcon className="mail-icon"/>Gửi email</button>
            </form>
            <div className="alert alert-info" role="alert">
                 Đã gửi email!
            </div>
            <div className="alert alert-danger" role="alert">
                 Có lỗi xảy ra! Vui lòng kiểm tra lại!
            </div>
        </div>
    )
}

export default ContactForm