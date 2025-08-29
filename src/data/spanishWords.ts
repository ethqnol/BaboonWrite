export const spanishWords = [
  "el", "de", "que", "y", "a", "en", "un", "es", "se", "no", "te", "lo", "le", "da", "su", "por", "son", "con",
  "para", "al", "una", "sur", "también", "fue", "era", "muy", "años", "hasta", "desde", "está", "estaba",
  "tiempo", "casa", "país", "vida", "día", "agua", "parte", "hoy", "mundo", "mano", "lugar", "trabajo",
  "gobierno", "persona", "año", "vez", "mejor", "poco", "estado", "momento", "forma", "gran", "hombre",
  "mujer", "niño", "empresa", "caso", "grupo", "problema", "mes", "fin", "semana", "hora", "programa",
  "pregunta", "hecho", "sistema", "cada", "donde", "mismo", "those", "hacer", "puede", "decir", "debe",
  "dar", "usar", "ir", "ver", "saber", "llegar", "pasar", "querer", "poner", "creer", "hablar", "llevar",
  "dejar", "seguir", "encontrar", "llamar", "venir", "pensar", "salir", "volver", "tomar", "conocer",
  "vivir", "sentir", "tratar", "mirar", "contar", "empezar", "esperar", "buscar", "existir", "entrar",
  "trabajar", "escribir", "perder", "producir", "ocurrir", "entender", "pedir", "recibir", "recordar",
  "terminar", "permitir", "aparecer", "conseguir", "comenzar", "servir", "sacar", "necesitar", "mantener",
  "resultar", "leer", "caer", "cambiar", "presentar", "crear", "abrir", "considerar", "oír", "acabar",
  "convertir", "ganar", "aceptar", "realizar", "suponer", "comprender", "lograr", "explicar", "reconocer",
  "estudiar", "morir", "incluir", "desarrollar", "cumplir", "responder", "alcanzar", "preparar", "gustar",
  "gato", "perro", "libro", "mesa", "silla", "ventana", "puerta", "cama", "cocina", "baño", "jardín",
  "coche", "avión", "tren", "barco", "ciudad", "pueblo", "montaña", "río", "mar", "playa", "bosque",
  "árbol", "flor", "hierba", "sol", "luna", "estrella", "lluvia", "nieve", "viento", "fuego", "tierra",
  "aire", "agua", "comida", "pan", "leche", "carne", "pescado", "fruta", "verdura", "café", "té",
  "rojo", "azul", "verde", "amarillo", "negro", "blanco", "grande", "pequeño", "alto", "bajo", "largo",
  "corto", "bueno", "malo", "nuevo", "viejo", "joven", "rápido", "lento", "fácil", "difícil", "caliente",
  "frío", "feliz", "triste", "cansado", "enfermo", "sano", "rico", "pobre", "limpio", "sucio", "lleno",
  "vacío", "abierto", "cerrado", "primera", "segundo", "tercero", "último", "próximo", "anterior", "mismo",
  "otro", "todo", "nada", "algo", "alguien", "nadie", "siempre", "nunca", "ahora", "después", "antes",
  "aquí", "allí", "donde", "cuando", "como", "porque", "pero", "aunque", "mientras", "durante", "entre",
  "sobre", "bajo", "cerca", "lejos", "dentro", "fuera", "arriba", "abajo", "izquierda", "derecha", "adelante",
  "atrás", "centro", "lado", "final", "principio", "medio", "completo", "parcial", "total", "general",
  "especial", "normal", "extraño", "común", "raro", "importante", "necesario", "posible", "imposible",
  "seguro", "peligroso", "libre", "ocupado", "disponible", "útil", "inútil", "interesante", "aburrido",
  "divertido", "serio", "gracioso", "inteligente", "tonto", "sabio", "ignorante", "educado", "maleducado",
  "amable", "cruel", "generoso", "tacaño", "honesto", "mentiroso", "valiente", "cobarde", "fuerte", "débil",
  "gordo", "delgado", "guapo", "feo", "hermoso", "horrible", "claro", "oscuro", "brillante", "opaco",
  "suave", "áspero", "duro", "blando", "pesado", "ligero", "grueso", "fino", "ancho", "estrecho", "profundo",
  "superficial", "alto", "bajo", "caro", "barato", "gratis", "pagado", "público", "privado", "nacional",
  "internacional", "local", "regional", "personal", "social", "político", "económico", "cultural", "natural",
  "artificial", "real", "falso", "verdadero", "cierto", "exacto", "correcto", "incorrecto", "perfecto",
  "familia", "padre", "madre", "hijo", "hija", "hermano", "hermana", "abuelo", "abuela", "tío", "tía",
  "primo", "prima", "esposo", "esposa", "novio", "novia", "amigo", "amiga", "conocido", "desconocido",
  "compañero", "colega", "jefe", "empleado", "cliente", "vendedor", "médico", "enfermero", "profesor",
  "estudiante", "policía", "bombero", "cocinero", "camarero", "conductor", "piloto", "artista", "músico",
  "escritor", "periodista", "fotógrafo", "pintor", "actor", "cantante", "bailarín", "deportista", "jugador",
  "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo", "enero", "febrero", "marzo",
  "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  "primavera", "verano", "otoño", "invierno", "mañana", "tarde", "noche", "madrugada", "mediodía",
  "medianoche", "desayuno", "almuerzo", "cena", "comida", "bebida", "restaurante", "bar", "café", "hotel",
  "tienda", "mercado", "banco", "hospital", "escuela", "universidad", "biblioteca", "museo", "teatro",
  "cine", "parque", "plaza", "calle", "avenida", "carretera", "autopista", "puente", "túnel", "edificio",
  "casa", "apartamento", "habitación", "salón", "dormitorio", "cocina", "baño", "jardín", "terraza", "balcón",
  "ordenador", "teléfono", "televisión", "radio", "música", "película", "libro", "periódico", "revista",
  "internet", "correo", "mensaje", "carta", "postal", "paquete", "regalo", "sorpresa", "fiesta", "celebración"
];

export function getRandomSpanishWords(count: number): string[] {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(spanishWords[Math.floor(Math.random() * spanishWords.length)]);
  }
  return words;
}