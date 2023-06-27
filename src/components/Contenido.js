import React from 'react'
import { List } from './List'
import { Agregar } from './Agregar'
import './contenido.css'
import { Reproductor } from './Reproductor'
export const Contenido = () => {
  return (
    <div className='contenido'>
        <List></List>
        <Reproductor></Reproductor>
    </div>
  )
}
