using SebastianCaceres.Entity;
using System.Data;
using System.Data.SqlClient;
namespace SebastianCaceres.DAO
{
    public class HijoDAO
    {
        private readonly string conexion;

        public HijoDAO(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<List<Hijo>> Lista(int Id)
        {
            List<Hijo> lista = new List<Hijo>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("proc_ListarHijos", con); 
                cmd.Parameters.AddWithValue("@IdPersonal ", Id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Hijo
                        {
                            IdHijo = Convert.ToInt32(reader["IdHijo"]),
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"]),
                            IdTipoDoc = Convert.ToInt32(reader["IdTipoDoc"]),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            NombreCompleto = reader["NombreCompleto"].ToString(),
                            FechaNac = reader["FechaNac"].ToString()
                        });
                    }
                }
            }

            return lista;

        }

        public async Task<Hijo> Obtener(int Id)
        {
            Hijo objeto = new Hijo();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("proc_ObtenerHijo", con);  
                cmd.Parameters.AddWithValue("@IdHijo", Id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Hijo
                        {
                            IdHijo = Convert.ToInt32(reader["IdHijo"]),
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"]),
                            IdTipoDoc = Convert.ToInt32(reader["IdTipoDoc"]),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            NombreCompleto = reader["NombreCompleto"].ToString(),
                            FechaNac = reader["FechaNac"].ToString()
                        };
                    }
                }
            }

            return objeto;

        }

        public async Task<bool> Crear(Hijo objeto)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("proc_InsertarHijo", con); 
                cmd.Parameters.AddWithValue("@IdPersonal ", objeto.IdPersonal);
                cmd.Parameters.AddWithValue("@IdTipoDoc ", objeto.IdTipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc ", objeto.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno ", objeto.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno  ", objeto.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1  ", objeto.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2  ", objeto.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac  ", objeto.FechaNac);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }

            return respuesta;

        }

        public async Task<bool> Editar(Hijo objeto)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("proc_ActualizarHijo", con);
                cmd.Parameters.AddWithValue("@IdHijo ", objeto.IdHijo);
                cmd.Parameters.AddWithValue("@IdPersonal ", objeto.IdPersonal);
                cmd.Parameters.AddWithValue("@IdTipoDoc ", objeto.IdTipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc ", objeto.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno ", objeto.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno  ", objeto.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1  ", objeto.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2  ", objeto.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac  ", objeto.FechaNac);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }

            return respuesta;

        }

        public async Task<bool> Eliminar(int Id)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("proc_EliminarHijo", con);
                cmd.Parameters.AddWithValue("@IdHijo ", Id);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }

            return respuesta;

        }
    }
}
