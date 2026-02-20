#!/bin/bash

# Liga360 - Script de inicio
# Configuración
APP_NAME="Liga360"

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

# Archivo temporal para capturar el log
LOG_FILE="/tmp/meteor_${APP_NAME}.log"
> "$LOG_FILE"

# Trap para limpieza al salir
cleanup() {
    echo -e "\n${RED}Deteniendo $APP_NAME...${NC}"
    kill $METEOR_PID 2>/dev/null
    wait $METEOR_PID 2>/dev/null
    echo -e "${GREEN}$APP_NAME detenido.${NC}"
    exit 0
}
trap cleanup INT TERM

# Iniciar Meteor redirigiendo output al log
echo -e "${BLUE}Compilando...${NC}"
npm start > "$LOG_FILE" 2>&1 &
METEOR_PID=$!

# Esperar a que compile o falle
while true; do
    # Si el proceso murió, mostrar error
    if ! kill -0 $METEOR_PID 2>/dev/null; then
        clear
        echo -e "${RED}==========================================${NC}"
        echo -e "${RED}  ERROR al iniciar $APP_NAME${NC}"
        echo -e "${RED}==========================================${NC}"
        echo ""
        cat "$LOG_FILE"
        exit 1
    fi

    # Si la app arrancó, limpiar pantalla y mostrar info
    if grep -q "App running at" "$LOG_FILE" 2>/dev/null; then
        clear
        echo -e "${GREEN}==========================================${NC}"
        echo -e "${GREEN}  $WHITE$APP_NAME$GREEN corriendo correctamente ✓${NC}"
        echo -e "${GREEN}==========================================${NC}"
        echo ""
        echo -e "  ${BLUE}▸ Frontend:${NC}  ${WHITE}http://localhost:3000${NC}"
        echo -e "  ${BLUE}▸ Backend:${NC}   ${WHITE}http://localhost:8080${NC}"
        echo ""
        echo -e "${GREEN}==========================================${NC}"
        echo -e "  ${RED}Ctrl+C${NC} para detener"
        echo -e "${GREEN}==========================================${NC}"
        echo ""
        break
    fi

    sleep 1
done

# Mostrar logs en tiempo real a partir de ahora (cambios, errores, HMR, etc.)
tail -f "$LOG_FILE" --pid=$METEOR_PID 2>/dev/null &
TAIL_PID=$!

wait $METEOR_PID
kill $TAIL_PID 2>/dev/null
