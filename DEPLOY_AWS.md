# Guía de Despliegue en AWS - Tienda Ballet

## Resumen del Flujo

```
Frontend (React) → Backend (Spring Boot) → MySQL (Docker en EC2)
     ↓                    ↓                        ↓
  Puerto 5173        Puerto 8080            Puerto 3306
```

---

## PASO 1: Crear y Configurar Instancia EC2

### 1.1 Lanzar Instancia
1. Ir a AWS Console → EC2 → Lanzar instancia
2. **Nombre:** `tienda-ballet-ec2`
3. **AMI:** Ubuntu Server (versión más reciente)
4. **Tipo de instancia:** `t2.micro` (Free Tier)
5. **Par de claves:** Crear nuevo par
   - Nombre: `tienda-ballet-key`
   - Tipo: RSA
   - Formato: .pem
   - **Descargar y guardar en lugar seguro**
6. **Configuración de red:**
   - Permitir tráfico SSH
   - Permitir tráfico HTTP
   - Permitir tráfico HTTPS
7. Clic en **Lanzar instancia**

### 1.2 Configurar Reglas de Seguridad
1. Ir a la instancia recién creada
2. Clic en pestaña **Seguridad**
3. Clic en el grupo de seguridad (sg-xxxxx)
4. **Editar reglas de entrada**
5. **Agregar las siguientes reglas:**

| Tipo | Puerto | Origen | Descripción |
|------|--------|--------|-------------|
| SSH | 22 | 0.0.0.0/0 | Acceso SSH |
| HTTP | 80 | 0.0.0.0/0 | Acceso web |
| HTTPS | 443 | 0.0.0.0/0 | Acceso web seguro |
| TCP personalizado | 3306 | 0.0.0.0/0 | MySQL |
| TCP personalizado | 8080 | 0.0.0.0/0 | Backend Spring Boot |
| TCP personalizado | 5173 | 0.0.0.0/0 | Frontend React (opcional) |

6. **Guardar reglas**

### 1.3 Obtener IP Pública
1. Seleccionar la instancia
2. Copiar **Dirección IPv4 pública** (ejemplo: 54.123.45.67)
3. **Guardar esta IP - la necesitarás en varios pasos**

---

## PASO 2: Conectarse a EC2

### 2.1 Preparar el archivo .pem
1. Ir a **Descargas** (donde descargaste `tienda-ballet-key.pem`)
2. Clic derecho en el archivo → **Abrir en Terminal**
3. Cambiar permisos del archivo:
```bash
chmod 400 tienda-ballet-key.pem
```

### 2.2 Conectarse vía SSH
```bash
ssh -i "tienda-ballet-key.pem" ubuntu@[TU_IP_PUBLICA]
```

**Ejemplo:**
```bash
ssh -i "tienda-ballet-key.pem" ubuntu@54.123.45.67
```

Cuando pregunte "Are you sure you want to continue?", escribir `yes`

---

## PASO 3: Instalar Docker y MySQL en EC2

### 3.1 Actualizar el sistema
```bash
sudo apt update
sudo apt upgrade -y
```

### 3.2 Instalar Docker
```bash
sudo snap install docker
```

### 3.3 Verificar instalación de Docker
```bash
docker --version
```

### 3.4 Crear container MySQL
```bash
sudo docker run -d \
  --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=tienda_ballet \
  -p 3306:3306 \
  mysql:latest
```

**Explicación:**
- `-d`: Ejecutar en background
- `--name mysql-db`: Nombre del container
- `-e MYSQL_ROOT_PASSWORD`: Contraseña del usuario root
- `-e MYSQL_DATABASE`: Crear base de datos automáticamente
- `-p 3306:3306`: Exponer puerto MySQL
- `mysql:latest`: Usar imagen oficial de MySQL

### 3.5 Verificar que MySQL está corriendo
```bash
sudo docker ps
```

Deberías ver algo como:
```
CONTAINER ID   IMAGE          STATUS         PORTS                    NAMES
abc123def456   mysql:latest   Up 10 seconds  0.0.0.0:3306->3306/tcp   mysql-db
```

### 3.6 Crear usuario admin en MySQL
```bash
sudo docker exec -it mysql-db mysql -u root -prootpass
```

Dentro de MySQL, ejecutar:
```sql
CREATE USER 'admin'@'%' IDENTIFIED BY 'adminpass';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

---

## PASO 4: Conectar MySQL Workbench

### 4.1 Configurar nueva conexión
1. Abrir MySQL Workbench
2. Clic en **+** (nueva conexión)
3. Configurar:
   - **Connection Name:** Tienda Ballet AWS
   - **Hostname:** [TU_IP_PUBLICA_EC2]
   - **Port:** 3306
   - **Username:** admin
   - **Password:** adminpass (clic en "Store in Keychain")
4. Clic en **Test Connection**
5. Si funciona, clic en **OK**

### 4.2 Verificar base de datos
1. Conectarse a la base de datos
2. Deberías ver el schema `tienda_ballet` (vacío por ahora)
3. Las tablas se crearán automáticamente cuando ejecutes el backend

---

## PASO 5: Configurar Backend para Producción

### 5.1 Actualizar application-prod.properties
Edita el archivo:
```
backend/src/main/resources/application-prod.properties
```

**Reemplaza `[TU_IP_PUBLICA_EC2]` con tu IP real:**
```properties
spring.datasource.url=jdbc:mysql://54.123.45.67:3306/tienda_ballet?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Santiago
```

### 5.2 Compilar el backend
En tu Mac, desde la carpeta `backend`:
```bash
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/backend
mvn clean package -DskipTests
```

Esto creará el archivo JAR en `target/tienda-ballet-backend-0.0.1-SNAPSHOT.jar`

---

## PASO 6: Instalar Java en EC2

### 6.1 Conectarse a EC2 (si no estás conectado)
```bash
ssh -i "tienda-ballet-key.pem" ubuntu@[TU_IP_PUBLICA]
```

### 6.2 Instalar Java 17
```bash
sudo apt update
sudo apt install openjdk-17-jre-headless -y
```

### 6.3 Verificar instalación
```bash
java -version
```

---

## PASO 7: Subir Backend a EC2

### 7.1 Desde tu Mac, subir el JAR usando scp
Abrir **nueva terminal** en tu Mac (NO cerrar la conexión SSH):

```bash
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/backend/target

scp -i ~/Downloads/tienda-ballet-key.pem \
  tienda-ballet-backend-0.0.1-SNAPSHOT.jar \
  ubuntu@[TU_IP_PUBLICA]:~/
```

**Ejemplo:**
```bash
scp -i ~/Downloads/tienda-ballet-key.pem \
  tienda-ballet-backend-0.0.1-SNAPSHOT.jar \
  ubuntu@54.123.45.67:~/
```

---

## PASO 8: Ejecutar Backend en EC2

### 8.1 Volver a la terminal SSH conectada a EC2

### 8.2 Verificar que el JAR se subió
```bash
ls -lh
```

Deberías ver: `tienda-ballet-backend-0.0.1-SNAPSHOT.jar`

### 8.3 Ejecutar el backend
```bash
java -jar tienda-ballet-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

**Cuando veas este mensaje, el backend está listo:**
```
Started TiendaBalletBackendApplication in X.XXX seconds
```

### 8.4 Verificar tablas en MySQL Workbench
1. Refrescar schema `tienda_ballet`
2. Deberías ver 3 tablas creadas:
   - `carrito`
   - `productos`
   - `usuarios`

### 8.5 Probar endpoint desde navegador
Abre en tu navegador:
```
http://[TU_IP_PUBLICA]:8080/api/productos
```

Debería retornar un array vacío `[]` o con productos si DataInitializer corrió.

---

## PASO 9: Ejecutar Backend en Background (Opcional)

Si cierras la terminal SSH, el backend se detendrá. Para evitarlo:

### 9.1 Instalar screen
```bash
sudo apt install screen -y
```

### 9.2 Ejecutar backend en screen
```bash
screen -S backend
java -jar tienda-ballet-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### 9.3 Salir de screen sin detener el proceso
Presionar: `Ctrl + A`, luego `D`

### 9.4 Para volver a ver los logs del backend
```bash
screen -r backend
```

### 9.5 Para detener el backend
1. Volver a screen: `screen -r backend`
2. Presionar: `Ctrl + C`
3. Salir de screen: `exit`

---

## PASO 10: Configurar Frontend

### 10.1 Actualizar API_URL
Edita el archivo:
```
frontend/src/api/api.js
```

**Cambiar de:**
```javascript
const API_URL = 'http://localhost:8080/api';
```

**A:**
```javascript
const API_URL = 'http://[TU_IP_PUBLICA]:8080/api';
```

**Ejemplo:**
```javascript
const API_URL = 'http://54.123.45.67:8080/api';
```

### 10.2 Compilar frontend para producción
```bash
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/frontend
npm run build
```

Esto creará la carpeta `dist` con los archivos optimizados.

### 10.3 Opción A: Probar frontend localmente apuntando a backend AWS
```bash
npm run dev
```

Abre `http://localhost:5173` y debería funcionar conectándose al backend en AWS.

### 10.4 Opción B: Subir frontend a EC2 (avanzado)
```bash
# Instalar nginx en EC2
sudo apt install nginx -y

# Copiar archivos del frontend
scp -i ~/Downloads/tienda-ballet-key.pem -r dist/* ubuntu@[TU_IP_PUBLICA]:~/frontend/

# En EC2, mover archivos a nginx
sudo mv ~/frontend/* /var/www/html/

# Acceder desde navegador
http://[TU_IP_PUBLICA]
```

---

## PASO 11: Verificación Final

### 11.1 Checklist de verificación

**Base de datos:**
- [ ] MySQL corriendo en Docker: `sudo docker ps`
- [ ] MySQL Workbench conectado
- [ ] 3 tablas creadas: carrito, productos, usuarios

**Backend:**
- [ ] Backend ejecutándose: `http://[IP]:8080/api/productos`
- [ ] Usuarios de prueba creados (admin, sofia, lanadelrey)
- [ ] 6 productos iniciales cargados

**Frontend:**
- [ ] API_URL apuntando a IP pública
- [ ] Login funcional
- [ ] Catálogo de productos visible
- [ ] Agregar al carrito funcional

### 11.2 Comandos útiles para debugging

**Ver logs de MySQL:**
```bash
sudo docker logs mysql-db
```

**Ver procesos Java:**
```bash
ps aux | grep java
```

**Ver qué está usando el puerto 8080:**
```bash
sudo lsof -i :8080
```

**Ver qué está usando el puerto 3306:**
```bash
sudo lsof -i :3306
```

---

## PASO 12: Consultas SQL Útiles

### 12.1 Desde terminal en EC2
```bash
sudo docker exec -it mysql-db mysql -u admin -padminpass tienda_ballet
```

### 12.2 Comandos SQL útiles
```sql
-- Ver todas las bases de datos
SHOW DATABASES;

-- Usar la base de datos
USE tienda_ballet;

-- Ver todas las tablas
SHOW TABLES;

-- Ver estructura de una tabla
DESCRIBE productos;

-- Ver todos los productos
SELECT * FROM productos;

-- Ver todos los usuarios
SELECT * FROM usuarios;

-- Ver todos los items del carrito
SELECT * FROM carrito;

-- Contar registros
SELECT COUNT(*) FROM productos;
```

---

## Troubleshooting

### Problema: No puedo conectarme a EC2
**Solución:**
- Verificar que las reglas de seguridad incluyan SSH (puerto 22)
- Verificar que el archivo .pem tiene permisos correctos: `chmod 400 archivo.pem`
- Verificar que estás usando la IP pública correcta

### Problema: MySQL Workbench no conecta
**Solución:**
- Verificar regla de seguridad para puerto 3306
- Verificar que Docker container está corriendo: `sudo docker ps`
- Verificar usuario/contraseña: admin/adminpass

### Problema: Backend no inicia
**Solución:**
- Verificar que Java está instalado: `java -version`
- Verificar que MySQL está corriendo
- Revisar IP en application-prod.properties
- Ver logs completos para identificar el error

### Problema: Frontend no conecta con backend
**Solución:**
- Verificar API_URL en api.js
- Verificar regla de seguridad para puerto 8080
- Verificar que backend está corriendo: `curl http://localhost:8080/api/productos`
- Verificar CORS en backend

---

## Entrega del Proyecto

### Archivos a incluir:
1. **Código fuente completo**
   - `frontend/` (todo el proyecto React)
   - `backend/` (todo el proyecto Spring Boot)

2. **Documentación**
   - Este archivo `DEPLOY_AWS.md`
   - `README.md` del proyecto
   - Screenshots de la aplicación funcionando

3. **Información de acceso**
   - IP pública de EC2
   - Usuario/contraseña de prueba (admin/admin123)
   - Link al repositorio GitHub

4. **Evidencias**
   - Screenshot de MySQL Workbench conectado
   - Screenshot de tablas creadas
   - Screenshot de aplicación funcionando
   - Logs del backend iniciando exitosamente

---

## Comandos de Referencia Rápida

**Conectar a EC2:**
```bash
ssh -i "tienda-ballet-key.pem" ubuntu@[IP_PUBLICA]
```

**Compilar backend:**
```bash
mvn clean package -DskipTests
```

**Subir JAR a EC2:**
```bash
scp -i ~/Downloads/tienda-ballet-key.pem target/*.jar ubuntu@[IP]:~/
```

**Ejecutar backend:**
```bash
java -jar tienda-ballet-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

**Compilar frontend:**
```bash
npm run build
```

---

**Última actualización:** 23 de enero de 2025
**Proyecto:** Tienda Ballet Fullstack
**Curso:** Desarrollo Fullstack
**Deadline:** Lunes 26 de enero de 2025
