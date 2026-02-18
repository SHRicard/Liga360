#!/bin/bash

# Liga360 - Script de inicio
# Configuración
APP_NAME="Liga360"
LOG_FILE="/tmp/meteor_${APP_NAME}.log"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
WHITE='\033[1;37m'
NC='\033[0m' # Sin color

# Función para limpiar puertos
cleanup_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    
    if [ -n "$pid" ]; then
        echo -e "${BLUE}Limpiando puerto $port...${NC}"
        kill -9 $pid 2>/dev/null
        sleep 1
    fi
}

# Inicio
echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}Iniciando ${WHITE}$APP_NAME${GREEN}...${NC}"
echo -e "${GREEN}==========================================${NC}"

# Limpieza de puertos
cleanup_port 3000
cleanup_port 8080

# Iniciar aplicación
> $LOG_FILE
npm start > $LOG_FILE 2>&1 &
METEOR_PID=$!

echo -e "${BLUE}Esperando compilación...${NC}"

# Esperar a que esté lista
while true; do
    if grep -q "App running at" $LOG_FILE 2>/dev/null; then
        echo -e "${BLUE}==========================================${NC}"
        echo -e "${BLUE}Aplicación iniciada correctamente${NC}"
        echo -e "${BLUE}Frontend: http://localhost:3000${NC}"
        echo -e "${BLUE}Backend:  http://localhost:8080${NC}"
        echo -e "${BLUE}==========================================${NC}"
        echo -e "${RED}Presiona Ctrl+C para detener${NC}"
        break
    fi    
    if ! kill -0 $METEOR_PID 2>/dev/null; then
        echo "Error al iniciar la aplicación"
        echo "Log: $LOG_FILE"
        exit 1
    fi
    
    sleep 1
done

# Mostrar log en tiempo real filtrando líneas internas de Meteor
trap "echo 'Deteniendo $APP_NAME...'; kill $METEOR_PID 2>/dev/null; exit 0" INT TERM
tail -f $LOG_FILE | grep -v --line-buffered '^=>' &
TAIL_PID=$!

# Esperar a que el proceso meteor termine
wait $METEOR_PID
kill $TAIL_PID 2>/dev/null
