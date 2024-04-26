namespace SebastianCaceres.Entity
{
    public class Personal
    {
        public int IdPersonal { get; set; }
        public int IdTipoDoc { get; set; }
        public string NumeroDoc { get; set; }
        public string ApPaterno { get; set; }
        public string ApMaterno { get; set; }
        public string Nombre1 { get; set; }
        public string? Nombre2 { get; set; }
        public string? NombreCompleto { get; set; }
        public string FechaNac { get; set; }
        public string FechaIngreso { get; set; }
    }
}
