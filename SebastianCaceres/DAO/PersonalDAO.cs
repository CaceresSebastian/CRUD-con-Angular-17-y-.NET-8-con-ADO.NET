using SebastianCaceres.Entity;
using System.Data;
using System.Data.SqlClient;
namespace SebastianCaceres.DAO
{
    public class PersonalDAO
    {
        private readonly string conexion;

        public PersonalDAO(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<List<Personal>> Lista()
        {
            List<Personal> lista = new List<Personal>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("proc_ListaPersonal", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Personal
                        {
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"]),
                            IdTipoDoc = Convert.ToInt32(reader["IdTipoDoc"]),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            NombreCompleto = reader["NombreCompleto"].ToString(),
                            FechaNac = reader["FechaNac"].ToString(),
                            FechaIngreso = reader["FechaIngreso"].ToString()
                        });
                    }
                }
            }

            return lista;
            
        }

        public async Task<Personal> Obtener(int Id)
        {
            Personal objeto = new Personal();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("proc_ObtenerPersonal", con); 
                cmd.Parameters.AddWithValue("@IdPersonal", Id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Personal
                        {
                            IdPersonal = Convert.ToInt32(reader["IdPersonal"]),
                            IdTipoDoc = Convert.ToInt32(reader["IdTipoDoc"]),
                            NumeroDoc = reader["NumeroDoc"].ToString(),
                            ApPaterno = reader["ApPaterno"].ToString(),
                            ApMaterno = reader["ApMaterno"].ToString(),
                            Nombre1 = reader["Nombre1"].ToString(),
                            Nombre2 = reader["Nombre2"].ToString(),
                            NombreCompleto = reader["NombreCompleto"].ToString(),
                            FechaNac = reader["FechaNac"].ToString(),
                            FechaIngreso = reader["FechaIngreso"].ToString()
                        };
                    }
                }
            }

            return objeto;

        }

        public async Task<bool> Crear(Personal objeto)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {
                
                SqlCommand cmd = new SqlCommand("proc_InsertarPersonal", con); 
                cmd.Parameters.AddWithValue("@IdTipoDoc ", objeto.IdTipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc ", objeto.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno ", objeto.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno ", objeto.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1 ", objeto.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2 ", objeto.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac ", objeto.FechaNac);
                cmd.Parameters.AddWithValue("@FechaIngreso ", objeto.FechaIngreso);
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

        public async Task<bool> Editar(Personal objeto)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("proc_ActualizarPersonal", con);
                cmd.Parameters.AddWithValue("@IdPersonal ", objeto.IdPersonal);
                cmd.Parameters.AddWithValue("@IdTipoDoc ", objeto.IdTipoDoc);
                cmd.Parameters.AddWithValue("@NumeroDoc ", objeto.NumeroDoc);
                cmd.Parameters.AddWithValue("@ApPaterno ", objeto.ApPaterno);
                cmd.Parameters.AddWithValue("@ApMaterno ", objeto.ApMaterno);
                cmd.Parameters.AddWithValue("@Nombre1 ", objeto.Nombre1);
                cmd.Parameters.AddWithValue("@Nombre2 ", objeto.Nombre2);
                cmd.Parameters.AddWithValue("@FechaNac ", objeto.FechaNac);
                cmd.Parameters.AddWithValue("@FechaIngreso ", objeto.FechaIngreso);
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

                SqlCommand cmd = new SqlCommand("proc_EliminarPersonal", con);
                cmd.Parameters.AddWithValue("@IdPersonal ", Id);
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
