const CACHE_NAME = "nxo-v1.0.0";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];


/* =========================================================
   INSTALACIÓN
========================================================= */

self.addEventListener("install", event => {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(APP_SHELL);

      })
      .then(() => {

        return self.skipWaiting();

      })

  );

});


/* =========================================================
   ACTIVACIÓN

   Borra versiones antiguas del caché.
========================================================= */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches
      .keys()
      .then(keys => {

        return Promise.all(

          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))

        );

      })
      .then(() => {

        return self.clients.claim();

      })

  );

});


/* =========================================================
   FUNCIONAMIENTO OFFLINE

   Primero intenta obtener el archivo desde caché.

   Si no existe, lo busca en internet.

   Si lo encuentra, lo guarda para futuras visitas.
========================================================= */

self.addEventListener("fetch", event => {

  const request = event.request;


  if (request.method !== "GET") {

    return;

  }


  event.respondWith(

    caches
      .match(request)
      .then(cachedResponse => {

        if (cachedResponse) {

          return cachedResponse;

        }


        return fetch(request)
          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type === "opaque"
            ) {

              return networkResponse;

            }


            const responseClone =
              networkResponse.clone();


            caches
              .open(CACHE_NAME)
              .then(cache => {

                cache.put(
                  request,
                  responseClone
                );

              });


            return networkResponse;

          })
          .catch(() => {

            /*
              Si el usuario está offline
              y está intentando navegar,
              mostramos index.html.
            */

            if (
              request.mode === "navigate"
            ) {

              return caches.match(
                "./index.html"
              );

            }

          });

      })

  );

});


/* =========================================================
   NOTIFICACIONES PUSH

   Esta parte servirá cuando en el futuro
   conectemos NXO con un servidor Web Push.
========================================================= */

self.addEventListener("push", event => {

  let data = {

    title: "NXO",

    body: "Tienes una nueva notificación.",

    icon: "./icons/icon-192.png",

    badge: "./icons/icon-192.png",

    url: "./"

  };


  /*
    Intentamos leer los datos enviados
    por el servidor.
  */

  if (event.data) {

    try {

      const received =
        event.data.json();


      data = {

        ...data,

        ...received

      };

    }

    catch {

      data.body =
        event.data.text();

    }

  }


  const options = {

    body:
      data.body,

    icon:
      data.icon ||
      "./icons/icon-192.png",

    badge:
      data.badge ||
      "./icons/icon-192.png",

    tag:
      data.tag ||
      "nxo-notification",

    renotify:
      false,

    data: {

      url:
        data.url ||
        "./"

    }

  };


  event.waitUntil(

    self.registration
      .showNotification(

        data.title || "NXO",

        options

      )

  );

});


/* =========================================================
   CUANDO SE TOCA UNA NOTIFICACIÓN
========================================================= */

self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();


    const targetUrl =

      event.notification
        .data
        ?.url

      ||

      "./";


    event.waitUntil(

      clients
        .matchAll({

          type: "window",

          includeUncontrolled:
            true

        })
        .then(windowClients => {

          /*
            Si NXO ya está abierta,
            enfocamos esa ventana.
          */

          for (
            const client
            of windowClients
          ) {

            if (
              client.url.includes(
                self.location.origin
              )
            ) {

              if (
                "focus"
                in client
              ) {

                client.navigate(
                  targetUrl
                );

                return client.focus();

              }

            }

          }


          /*
            Si NXO está cerrada,
            abrimos una nueva ventana.
          */

          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              targetUrl
            );

          }

        })

    );

  }
);


/* =========================================================
   CERRAR NOTIFICACIÓN
========================================================= */

self.addEventListener(
  "notificationclose",
  event => {

    /*
      Más adelante podemos guardar
      estadísticas sobre qué avisos
      fueron descartados.
    */

  }
);


/* =========================================================
   MENSAJES DESDE app.js

   Permite que la aplicación pueda
   comunicarse con el Service Worker.
========================================================= */

self.addEventListener(
  "message",
  event => {

    const data =
      event.data;


    if (!data) {

      return;

    }


    /*
      Forzar activación de una nueva
      versión del Service Worker.
    */

    if (
      data.type ===
      "SKIP_WAITING"
    ) {

      self.skipWaiting();

    }


    /*
      Limpiar caché manualmente.
    */

    if (
      data.type ===
      "CLEAR_CACHE"
    ) {

      event.waitUntil(

        caches
          .keys()
          .then(keys => {

            return Promise.all(

              keys.map(
                key =>
                  caches.delete(key)
              )

            );

          })

      );

    }

  }
);


/* =========================================================
   SINCRONIZACIÓN EN SEGUNDO PLANO

   Algunos navegadores soportan Background Sync.
   iOS puede limitar esta función.

   Se deja preparada para futuras versiones.
========================================================= */

self.addEventListener(
  "sync",
  event => {

    if (
      event.tag ===
      "nxo-sync"
    ) {

      event.waitUntil(
        syncNXOData()
      );

    }

  }
);


async function syncNXOData() {

  /*
    Futuramente aquí podremos:

    - Sincronizar tareas
    - Sincronizar hábitos
    - Enviar backups
    - Actualizar datos entre dispositivos

    cuando NXO tenga servidor o cuenta.
  */

  return Promise.resolve();

}
