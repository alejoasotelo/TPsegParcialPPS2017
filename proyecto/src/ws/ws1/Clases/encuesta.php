<?php
require_once "AccesoDatos.php";

class Encuesta
{
    const ESTADO_PENDIENTE = 'pendiente';
    const ESTADO_COMPLETADA = 'completada';

    public $id_encuesta;
    public $id_curso;
    public $descripcion;
    public $fecha_inicio;
    public $fecha_fin;

    public static function trearEncuestasByIdUsuario($id_usuario, $estado = null) {

        $cnx = AccesoDatos::dameUnObjetoAcceso();

        if ($estado == self::ESTADO_COMPLETADA) {

            $sql = 'SELECT e.* FROM encuestas e
                        LEFT JOIN encuestas_usuarios eu ON (eu.encuestas_id_encuesta = e.id_encuesta)
                        WHERE eu.usuarios_id_usuario = :id_usuario
                        AND eu.encuestas_id_encuesta IN (
                            SELECT id_encuesta FROM usuario_respuestas WHERE id_usuario = :id_usuario2 GROUP BY id_encuesta
                        )';

            $consulta = $cnx->RetornarConsulta($sql);
            $consulta->bindValue(':id_usuario2', $id_usuario, PDO::PARAM_INT);

        } elseif ($estado == self::ESTADO_PENDIENTE) {

            $sql = 'SELECT e.* FROM encuestas e
                        LEFT JOIN encuestas_usuarios eu ON (eu.encuestas_id_encuesta = e.id_encuesta)
                        WHERE eu.usuarios_id_usuario = :id_usuario
                        AND eu.encuestas_id_encuesta NOT IN (
                            SELECT id_encuesta FROM usuario_respuestas WHERE id_usuario = :id_usuario2 GROUP BY id_encuesta
                        )';

            $consulta = $cnx->RetornarConsulta($sql);
            $consulta->bindValue(':id_usuario2', $id_usuario, PDO::PARAM_INT);

        } else {

            $sql = 'SELECT e.* FROM encuestas_usuarios eu LEFT JOIN encuestas e
                ON (eu.encuestas_id_encuesta = e.id_encuesta)
                WHERE eu.usuarios_id_usuario = :id_usuario';

            $consulta = $cnx->RetornarConsulta($sql);
        }

        $consulta->bindValue(':id_usuario', $id_usuario, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
    }

}