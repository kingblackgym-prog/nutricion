# Brian: cómo sumar el dashboard de Nutrición a tu Claude

Esta carpeta es el **dashboard de asesoramiento nutricional de Kingblack**. Ya está publicado y
funcionando en:

**https://kingblackgym-prog.github.io/nutricion/**

Para **usarlo** no necesitás nada: abrís el link, cargás al cliente y tocás *Descargar PDF (EVO)*.
Esta guía es para que **tu Claude** lo tenga, lo pueda modificar y lo vuelva a publicar.

---

## 1. Qué necesitás instalar (una sola vez)

| Qué | Para qué | Dónde |
|---|---|---|
| **Claude** (app de escritorio, pestaña *Code*) o **Claude Code** en la terminal | Que Claude trabaje sobre el proyecto | https://claude.ai/download |
| **Node.js 22 o más nuevo** | Probarlo en tu compu y armar la versión publicable | https://nodejs.org (versión LTS) |
| **Git** | Bajar el proyecto y subir los cambios | En Mac: abrí la Terminal y escribí `git --version`; si no está, te ofrece instalarlo |
| **GitHub CLI (`gh`)** | Iniciar sesión en GitHub sin manejar contraseñas | https://cli.github.com |

> No hace falta ninguna contraseña ni clave del proyecto: no tiene mail, base de datos ni tokens.

## 2. Accesos

| Acceso | Cómo se consigue |
|---|---|
| **Ver y descargar el código** | Nada: el repositorio es público → https://github.com/kingblackgym-prog/nutricion |
| **Publicar cambios** (que se actualice el link) | Una **cuenta de GitHub propia**. Pasale tu usuario a Maxi para que te agregue como **colaborador** del repositorio `kingblackgym-prog/nutricion`. Te llega un mail de invitación: aceptala. |
| **Iniciar sesión en tu compu** | En la Terminal: `gh auth login` → GitHub.com → HTTPS → *Login with a web browser*. Entrás con **tu** cuenta, no con la del gimnasio. |

## 3. Bajar el proyecto

**Opción recomendada (para poder publicar):** clonarlo desde GitHub. En la Terminal:

```bash
cd ~/Documents
git clone https://github.com/kingblackgym-prog/nutricion.git kingblack-nutricion
```

Después copiá la carpeta `referencias/` de este .zip adentro de `~/Documents/kingblack-nutricion/`
(es material interno y no está en GitHub a propósito).

**Opción rápida (solo para mirar o probar):** descomprimí este .zip en `Documentos`. Así no vas a
poder publicar hasta clonar el repositorio como en la opción de arriba.

## 4. Abrirlo con Claude

1. Abrí Claude → pestaña **Code** → elegí la carpeta `kingblack-nutricion`
   (o en la Terminal: `cd ~/Documents/kingblack-nutricion && claude`).
2. Claude lee solo el archivo **`CLAUDE.md`**: ahí está todo el contexto (qué es, cómo está hecho,
   el estilo Kingblack, cómo publicar y qué no tocar). No hace falta explicarle nada.
3. Pegale este primer mensaje para que lo verifique:

   > Leé el CLAUDE.md, levantá el dashboard en localhost, cargá un cliente de prueba y generá el PDF
   > para confirmar que todo funciona. Después borrá el borrador de prueba.

## 5. Pedirle cambios

Pedíselos con tus palabras, por ejemplo:

- "Agregá una pauta nueva: *Evitar bebidas azucaradas*."
- "En el PDF, poné el teléfono del gimnasio en la franja de abajo."
- "Sumá un campo de cintura en los datos del cliente."

Cuando termine, pedile **"publicalo"**: Claude regenera el archivo (`npm run build`), hace commit y
push, y en 1 o 2 minutos se actualiza el link. Necesita el acceso de colaborador del punto 2.

## 6. Bueno saber

- **Datos de clientes:** nunca se suben a internet. Quedan solo en el navegador de quien usa el
  dashboard, hasta tocar *Nuevo informe*.
- **El PDF** es para subir a la ficha del cliente en **EVO**.
- **El estilo Kingblack** (Outfit, carbón `#2C2828`, amarillo `#F4C93C`, cards redondeadas, franja
  con el slogan) está explicado en `CLAUDE.md` y sirve para cualquier proyecto nuevo del gimnasio.
- Si dos personas cambian cosas a la vez, antes de empezar pedile a Claude: "traé lo último de GitHub"
  (`git pull`), así no se pisan los cambios.
