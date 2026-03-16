import { Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="herb-section-title mb-2">Contact Us</h1>
    <p className="font-body text-muted-foreground mb-10">We'd love to hear from you</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="herb-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full herb-gradient flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">Phone</h3>
          </div>
          <p className="font-body text-sm text-muted-foreground">8667611271</p>
          <p className="font-body text-sm text-muted-foreground">9790623268</p>
        </div>

        <div className="herb-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full herb-gradient flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">Email</h3>
          </div>
          <p className="font-body text-sm text-muted-foreground">harprenaturals@gmail.com</p>
        </div>

        <div className="herb-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full herb-gradient flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">WhatsApp</h3>
          </div>
          <p className="font-body text-sm text-muted-foreground">9790603088 / 8667611827</p>
          <a
            href="https://wa.me/919790603088"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 herb-btn-primary text-sm py-2 px-5"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="herb-card p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Send us a Message</h2>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <input placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input placeholder="Email" type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input placeholder="Phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <button type="submit" className="herb-btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactPage;
