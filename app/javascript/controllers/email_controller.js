import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["subject", "body", "list"];

  connect() {
    if (this.hasSubjectTarget && this.hasBodyTarget) {
      this.loadEmail(this.subjectTarget.dataset.emailId);
    }
  }

  select(event) {
    event.preventDefault();
    const emailId = event.currentTarget.dataset.emailId;
    this.loadEmail(emailId);
  }

  loadEmail(emailId) {
    fetch(`/inbox/${emailId}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.subjectTarget.textContent = data.subject;
        this.bodyTarget.innerHTML = this.simpleFormat(data.body);

        // Update the bold status of the list items
        this.listTargets.forEach((item) => {
          if (item.dataset.emailId === emailId) {
            item.classList.remove("font-bold");
          }
        });
      });
  }

  simpleFormat(text) {
    if (!text) return "";
    let formatted = text.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
    return `<p>${formatted}</p>`;
  }
}
