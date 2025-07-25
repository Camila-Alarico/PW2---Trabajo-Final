# Cuna UNSA

## Descripción General
Este proyecto consiste en el desarrollo de una aplicación web para optimizar el proceso de admisión del Cuna-Jardín de la Universidad Nacional de San Agustín (UNSA). La plataforma permite registrar y gestionar postulantes, padres de familia, etapas del proceso y pagos, todo desde un panel administrativo seguro y fácil de usar.

El sistema se compone de:
- Un Backend en Django, encargado de la lógica del sistema, la gestión de datos y la API REST.
- Un Frontend en Angular, que presenta información institucional de forma dinámica y atractiva para los usuarios.
- Entre las principales funcionalidades se incluyen:
- Vistas CRUD completas (crear, listar, actualizar y eliminar).
- Consultas en formato JSON y operaciones asíncronas con AJAX y JavaScript.
- Inicio de sesión seguro para administradores.
- Generación de informes en PDF y envío de correos electrónicos.
- Diseño adaptable con Angular y uso de plantillas para una experiencia de usuario moderna.

El sistema es escalable y permite la incorporación de nuevas funcionalidades a futuro, alineándose con los objetivos de digitalización y mejora continua de la UNSA.

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [URLs](#urls)
- [Modelo de Datos](#modelo-de-datos)
- [Backend](#backend)
- [API REST](#api-rest)
- [Frontend](#frontend)
- [AJAX](#ajax)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Recomendaciones](#recomendaciones)
- [Conclusiones](#conclusiones)
- [Referencias](#referencias)

---

## URLs

- 🔗 Repositorio Backend: [GitHub Backend](https://github.com/usuario/proyecto-backend)
- 🔗 Repositorio Frontend: [GitHub Frontend](https://github.com/usuario/proyecto-frontend)
  - o bien: [GitHub Único con carpetas BACKEND y FRONTEND](https://github.com/usuario/proyecto)
- 🌐 URL del sitio desplegado con dominio HTTPS: [https://www.miappweb.com](https://www.miappweb.com)
  - **Usuario para probar**: `admin`  
  - **Contraseña**: `admin123`
  - Base de datos con registros listos para probar CRUDs.

---

## Modelo de Datos

modelo entidad-relación del sistema:

![Modelo de Datos](docs/modelo_datos.png)

- Un `Parent` puede tener muchos `Applicant` (hijos).
- Cada `Applicant` puede tener múltiples `Payments` y `AdmissionStages`.
- La relación entre hermanos se representa al compartir el mismo `parent_id`.
    
```mermaid
classDiagram
    Usuario <|-- Admin
    Usuario <|-- Cliente
    Producto *-- Categoria
    Pedido o-- Cliente## Modelo de Datos














" https://www.unsa.edu.pe/proceso-de-admision-cuna-jardin-unsa-2024/

Proceso de admision cuna-jardin unsa 
Estimados padres de familia, nuestra institución agradece su interés por formar parte de nuestra comunidad, les
informamos que desarrollaremos el proceso de admisión para las aulas 1 año, 2 años, 4 años y 5 años 2024 en forma presencial.
VACANTES A OFERTAR
 Aula de 1 año : 15 vacantes  Aula de 2 años: 20vacantes  Aula de 4 años: 5 vacantes   Aula de 5 años: 5 vacantes
HORARIO: Lunes a viernes de 8:45 a 13:30 horas
REQUISITOS
Los postulantes deben de cumplir la edad a la que postulan hasta el 31 de marzo ejemplo (si mi niño postula al aula de 2 años deberá de cumplir máximo los 2 años hasta el 31 de marzo 2024)
Derecho de admisión por el monto de s/. 100.00 en las cuentas que se brindará (Banco de la Nación Cuenta Corriente Nro.00-101-202-992.
Solicitante: Nombre o DNI del niño (a) o Padre
BCP Cta. a Abonar: 215-1588792-0-19
Cód. ID Usuario: Nombre o DNI del niño (a) o PadreDescripción: pagos varios).
DNI del postulante original y una copia
Formato de inscripción que se llenará en la institución.
Traer el voucher de admisión original y, copia DNI en un file, en la portada del mismo deberá ir los nombres y aula
que su menor niño o niña postula
INSCRIPCIONES PROCESO ADMISIÓN
 02 al 9 de enero 2024
ENTREVISTAS A LOS PADRES DE FAMILIA
 10 al 15 de enero 2024 de acuerdo al cronograma
CONVIVENCIA
 16 al 19 de enero 2024 de acuerdo al cronograma
RESULTADOS DE LOS INGRESANTES
 23 de enero 2024
MATRICULAS SOLO PARA INGRESANTES
 25 al 31 de enero 2024


cumplir lo siguiente:

○	Una app independiente
■	URLs propios, usando reverse (2 puntos)
■	Plantillas propias de la aplicación (1 puntos)
■	Que usen widgets de manera elegante (1 puntos)
○	Vistas de Listado, Detalle, Crear, Actualizar y Borrar (4 puntos)
■	Formulario con restricciones de seguridad adicionales (2 puntos)
○	Vista de consultas que devuelva Json (3 puntos)
■	Programa cliente para hacer y consumir las consultas
■	Con Ajax (2 puntos)
■	Con Framework de JavaScript (3 puntos)
○	Al menos dos modelos (2 puntos)
■	Modelo con clave externa: foreign key (+2 puntos, opcional)
○	CSS o Bootstrap (2 puntos)
○	Publicó su aplicación en el web (+3 puntos, opcional)
○	Descargar un informe como archivos pdf (+2 puntos, opcional)
○	Enviar correo (+2 puntos, opcional)

" 



