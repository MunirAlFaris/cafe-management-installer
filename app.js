(function () {
  const versionEl = document.getElementById("version");
  const errorEl = document.getElementById("load-error");
  const buttons = {
    windows: document.getElementById("download-windows"),
    android_cafe: document.getElementById("download-android-cafe"),
    android_restaurant: document.getElementById("download-android-restaurant"),
  };

  function setLoading() {
    Object.values(buttons).forEach(function (btn) {
      if (btn) {
        btn.classList.add("is-disabled");
        btn.removeAttribute("href");
      }
    });
  }

  function setError(message) {
    if (errorEl) {
      errorEl.classList.add("is-visible");
      var text = errorEl.querySelector("span");
      if (text) {
        text.textContent = message;
      }
    }
  }

  function applyDownloads(data) {
    if (versionEl && data.version) {
      versionEl.textContent = "الإصدار " + data.version;
    }

    var links = {
      windows: data.windows,
      android_cafe: data.android_cafe,
      android_restaurant: data.android_restaurant,
    };

    Object.keys(links).forEach(function (key) {
      var btn = buttons[key];
      var url = links[key];
      if (!btn) return;

      if (url) {
        btn.href = url;
        btn.classList.remove("is-disabled");
      } else {
        btn.classList.add("is-disabled");
        btn.removeAttribute("href");
      }
    });
  }

  setLoading();

  fetch("./downloads.json")
    .then(function (res) {
      if (!res.ok) {
        throw new Error("تعذر تحميل معلومات الإصدار.");
      }
      return res.json();
    })
    .then(applyDownloads)
    .catch(function () {
      setError("تعذر تحميل روابط التحميل. يرجى المحاولة لاحقاً.");
    });
})();
