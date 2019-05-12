import { document, exists } from "browser-monads";

class cookie {
  static set(cname, cvalue, { exdays, path } = {exdays: 1, path: '/'}) {
    if (!exists(document)) {
      return;
    }
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
  }

  static get(cname) {
    if (!exists(document)) {
        return;
    }
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  static check(cname) {
    var c = this.get(cname);
    if (c === "") {
      return false;
    }
    return true;
  }
}

export default cookie;
