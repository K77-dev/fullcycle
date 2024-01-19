package main

import (
    "database/sql"
    "fmt"
    "log"
    "net/http"

    _ "github.com/go-sql-driver/mysql"
)

func main() {
    // Conectar ao banco de dados
    db, err := sql.Open("mysql", "root:root@tcp(mysql:3306)/bdfullcycle")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Configurar rota HTTP
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        // Consulta à tabela usuario sem parâmetros
        var bd string
        err := db.QueryRow("SELECT SCHEMA_NAME FROM information_schema.SCHEMATA LIMIT 1").Scan(&bd)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        // Escrever resposta
        fmt.Fprintln(w, "FULLCYCLE - Desafio 1")
        fmt.Fprintf(w, "Consulta na tabela SCHEMATA do bd information_schema: %s", bd)
    })

    // Iniciar o servidor HTTP na porta 8080
    fmt.Println("Servidor iniciado na porta 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
