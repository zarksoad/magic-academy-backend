# Team conventions
- Transformers are what the industry is known as _mappers_.


Aquí tienes el archivo README.md completo para guiar a los desarrolladores sobre cómo hacer commits siguiendo las reglas de Conventional Commits:

# Guía de Commits

Este proyecto sigue el estándar **Conventional Commits** para mantener un historial de commits claro y estructurado. A continuación, se describen las reglas y cómo hacer commits correctamente.

## Estructura del Mensaje de Commit

Un mensaje de commit debe seguir la siguiente estructura:

<tipo>[alcance opcional]: <descripción>

[cuerpo opcional]

[pie opcional]

### Ejemplo

```bash
feat(auth): add login functionality

Added login feature to the authentication module.
```

```bash
BREAKING CHANGE: removed old login API endpoints
```

## Tipos de Commit

Los tipos permitidos para el commit son los siguientes:

- **build**: Cambios que afectan el sistema de construcción o dependencias externas (ej. webpack, npm).
- **chore**: Cambios en el proceso de desarrollo que no afectan el código de producción (ej. configuración de herramientas).
- **ci**: Cambios en los archivos de configuración y scripts de CI (ej. GitHub Actions, CircleCI).
- **docs**: Cambios en la documentación (ej. README, wiki).
- **feat**: Nueva característica para el usuario final.
- **fix**: Corrección de un error.
- **perf**: Cambios que mejoran el rendimiento.
- **refactor**: Cambios en el código que no corrigen errores ni agregan características (ej. renombrar variables).
- **style**: Cambios que no afectan el significado del código, solo la forma en que está escrito (ej. formateo).
- **test**: Agregar pruebas o corregir pruebas existentes.
- **revert**: Revertir un commit anterior.

## Reglas de Commit

- **Tipo no vacío**: El tipo del commit no debe estar vacío.
- **Asunto no vacío**: El asunto del commit no debe estar vacío.
- **Longitud del encabezado**: El encabezado del commit debe tener una longitud máxima de 72 caracteres.
- **Tipo válido**: El tipo del commit debe estar en la lista de tipos permitidos.
- **Formato del cuerpo**: El cuerpo del commit, si se incluye, debe comenzar con una línea en blanco después de la descripción y puede contener múltiples párrafos.

## Mensajes de Commit

Aquí hay algunos ejemplos de cómo estructurar tus mensajes de commit:
t

- **Agregar una nueva característica**:
  feat(auth): add login functionalityty

- **Corregir un error**:
  fix(parser): handle empty input

- **Cambiar la API**:
  feat(api)!: remove deprecated endpoints

- **Actualizar la documentación**:
  docs: update README with installation instructions

- **Revertir un cambio**:
  revert: let us never again speak of the noodle incident

Reverts commit 676104e.

## Configuración del Hook de Commit

Para garantizar que los mensajes de commit cumplan con estas reglas, utilizamos el hook de `commit-msg` proporcionado por Husky. Asegúrate de que el archivo de configuración esté presente y correctamente configurado en `.husky/commit-msg`.

### Archivo de Configuración de Commitlint

El archivo de configuración para `commitlint` en el proyecto está ubicado en `.commitlintrc.js` y contiene las siguientes reglas:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
        'revert',
      ],
    ],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
};
```

## Cómo Instalar y Configurar Husky

Para instalar y configurar Husky en tu proyecto, sigue estos pasos:

#### Instalar Husky:

```bash
npm install husky --save-dev
```

#### Habilitar hooks de Git:

```bash
npx husky install
```

#### Agregar el hook commit-msg:

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

## Por Qué Usar Conventional Commits

- **Generación automática de CHANGELOGs:** Facilita la creación de registros de cambios.
- **Determinación automática del aumento de versión:** Basado en los tipos de commits realizados.
- **Comunicación clara de los cambios:** Facilita la comprensión de los cambios para los miembros del equipo y otros interesados.
- **Activación de procesos de construcción y publicación:** Permite automatizar la integración y entrega continua.
- **Facilita las contribuciones:** Hace que el historial de commits sea más accesible para nuevos colaboradores.

## Preguntas Frecuentes (FAQ)

- ¿Cómo debo tratar los mensajes de commit en la fase inicial de desarrollo?

Procede como si ya hubieras lanzado el producto. Esto ayudará a mantener un historial claro y útil desde el principio.

- ¿Los tipos en el título del commit deben estar en mayúsculas o minúsculas?

Cualquier formato de mayúsculas o minúsculas es válido, pero es mejor ser consistente.

- ¿Qué hacer si el commit se ajusta a más de un tipo de commit?

Si es posible, realiza múltiples commits para cubrir todos los tipos. Esto ayuda a mantener un historial de commits organizado.

- ¿Esto desalienta el desarrollo rápido y la iteración?

No, ayuda a mover rápido de manera organizada y sostenida.

- ¿Cómo se relaciona esto con SemVer?

fix se traduce en una versión PATCH.
feat se traduce en una versión MINOR.
Los commits con un BREAKING CHANGE se traducen en una versión MAJOR.

- ¿Qué hacer si uso el tipo de commit incorrecto?

Antes de fusionar o lanzar, utiliza git rebase -i para editar el historial de commits. Después del lanzamiento, el proceso de limpieza puede variar según las herramientas y procesos utilizados.

Para más información sobre Conventional Commits, consulta la especificación completa.

¡Gracias por seguir estas pautas y contribuir a mantener un historial de commits claro y útil!

Claro, te ayudaré con la documentación de la funcionalidad de registro y con la invitación por correo electrónico para administradores e instructores. Aquí te dejo una estructura que podrías agregar en el archivo `README.md` de tu proyecto.

---

## Register API

### **Endpoint: `POST /api/auth/register`**

Este endpoint permite registrar un nuevo usuario en el sistema. Dependiendo del tipo de usuario, pueden ser registrados como estudiantes, administradores o instructores.

#### **Request**

```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "roleId": 1 // 1 = Estudiante, 2 = Instructor, 3 = Administrador
}
```

#### **Body Parameters**

| Campo      | Tipo     | Descripción                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------- |
| `name`     | `string` | Nombre del usuario.                                                               |
| `email`    | `string` | Correo electrónico único del usuario.                                             |
| `password` | `string` | Contraseña del usuario.                                                           |
| `roleId`   | `number` | ID del rol del usuario (`1 = Estudiante`, `2 = Instructor`, `3 = Administrador`). |

#### **Response (201 Created)**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "roleId": 1,
  "createdAt": "2024-09-10T12:00:00Z"
}
```

#### **Errores comunes**

- `400 Bad Request`: Datos incompletos o formato inválido.
- `409 Conflict`: El correo electrónico ya está registrado en el sistema.
- `500 Internal Server Error`: Error en el servidor al crear el usuario.

---

## Enviar Invitación por Correo Electrónico

### **Descripción**

Cuando se crea un nuevo administrador o instructor, el sistema envía automáticamente un correo electrónico de invitación con un enlace para que el usuario active su cuenta y configure su contraseña.

#### **Flujo de la Invitación:**

1. **Registro del Administrador o Instructor**: Al registrar un nuevo administrador o instructor, se envía un correo electrónico a la dirección proporcionada.
2. **Correo Electrónico de Invitación**: El correo contiene un enlace único para que el usuario pueda acceder al sistema y completar el proceso de activación.
3. **Activación de la Cuenta**: Al hacer clic en el enlace, el usuario será redirigido a una página para establecer su contraseña e iniciar sesión en la plataforma.

#### **Ejemplo de Correo Electrónico de Invitación**:

```plaintext
Asunto: Invitación para unirte a [Nombre del Sistema]

Hola [Nombre del Usuario],

Te damos la bienvenida a [Nombre del Sistema]. Has sido registrado como [Administrador/Instructor].

Haz clic en el siguiente enlace para activar tu cuenta y establecer una contraseña:

[Enlace de activación]

Si no solicitaste esta cuenta, por favor ignora este correo.

Atentamente,
El equipo de [Nombre del Sistema]
```

#### **Consideraciones Técnicas:**

- El enlace de activación debe ser seguro y contener un token único de tiempo limitado.
- Si el enlace expira, el usuario puede solicitar uno nuevo a través de la opción de "Recuperar contraseña".

---

### **Configuración del Correo Electrónico en el Sistema**

El servicio de envío de correos electrónicos está basado en Nodemailer y usa SMTP para enviar las invitaciones. Asegúrate de configurar correctamente las variables de entorno para el servidor SMTP.

#### **Variables de Entorno (Ejemplo en .env)**

```env
HOST_EMAIL=gmail
PORT_EMAIL=465
USER_EMAIL=magic.academy.email@gmail.com
PASSWORD_EMAIL=Magic123*
```

El servicio de correos debe estar configurado en la aplicación para disparar la invitación cuando se cree un nuevo administrador o instructor.

---

# API de Inicio de Sesión

## Endpoint

**Método:** POST  
**URL:** `/api/auth/login`  

Este endpoint permite a un usuario iniciar sesión en el sistema. El usuario debe proporcionar su correo electrónico y contraseña para autenticarse.

## Request

**Content-Type:** `application/json`

### Cuerpo de la Solicitud

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Parámetros del Cuerpo

| Campo     | Tipo    | Descripción                       |
|-----------|---------|-----------------------------------|
| `email`   | `string` | Correo electrónico del usuario.    |
| `password`| `string` | Contraseña del usuario.            |


```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
Campos de Respuesta
### Campos de Respuesta

| Campo  | Tipo    | Descripción                                           |
|--------|---------|-------------------------------------------------------|
| `token`| `string` | Token de autenticación JWT para acceder a rutas protegidas. |

400 Bad Request: Datos incompletos o formato inválido.
401 Unauthorized: Credenciales inválidas o usuario no autenticado.
500 Internal Server Error: Error en el servidor al procesar la solicitud.







