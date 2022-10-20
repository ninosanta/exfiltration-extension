(function() {
  class ExfiltrationExtension extends window.Extension {
    constructor() {
      super('exfiltration-extension');
      this.addMenuEntry('Exfiltration Extension');

      if (!window.Extension.prototype.hasOwnProperty('load')) {
        this.load();
      }
    }

    load() {
      this.content = '';
      return fetch(`/extensions/${this.id}/views/content.html`)
        .then((res) => res.text())
        .then((text) => {
          this.content = text;
        })
        .catch((e) => console.error('Failed to fetch content:', e));
    }

    show() {
      this.view.innerHTML = this.content;

      const token =
        document.getElementById('extension-exfiltration-extension-form-token');
      const list =
        document.getElementById('extension-exfiltration-extension-list-addons');
      const exfiltrate =
        document.getElementById('extension-exfiltration-extension-exfiltration');
      const pre =
        document.getElementById('extension-exfiltration-extension-response-data');

      list.addEventListener('click', () => {
        window.API.getInstalledAddons(
        ).then((body) => {
          // console.log(JSON.stringify(body, null, 2));
          pre.innerText = JSON.stringify(body, null, 2);
        }).catch((e) => {
          pre.innerText = e.toString();
        });
      });
      exfiltrate.addEventListener('click', () => {
        window.API.getInstalledAddons(
        ).then((body) => {
          const data = {body: body, token: token.value};
          window.API.postJson(
            `/extensions/${this.id}/api/exfiltration-api`,
            data
          );
        }).catch((e) => {
          console.log(e.toString());
        });
      });
    }
  }

  new ExfiltrationExtension();
})();
