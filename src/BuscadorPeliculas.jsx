import { useState } from "react"


export const BuscadorPeliculas = () => {

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fechPeliculas()
    }

    const fechPeliculas = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BASE}?query=${busqueda}&api_key=${import.meta.env.VITE_API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        } catch (error) {
            console.error('A surgido un error: ', error)
        }
    }

    return (
        <div className="container">

            <h1 className="title">Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Escribí una película"
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>


            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>

                ))}

            </div>

        </div>
    )
}
