using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SebastianCaceres.DAO;
using SebastianCaceres.Entity;
namespace SebastianCaceres.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly PersonalDAO _personalDAO;
        public PersonalController(PersonalDAO personalDAO)
        {
            _personalDAO = personalDAO;
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            List<Personal> Lista = await _personalDAO.Lista();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Personal objeto = await _personalDAO.Obtener(id);
            return StatusCode(StatusCodes.Status200OK, objeto);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Personal objeto)
        {
            bool respuesta = await _personalDAO.Crear(objeto);
            return StatusCode(StatusCodes.Status200OK, new {isSucces = respuesta});
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Personal objeto)
        {
            bool respuesta = await _personalDAO.Editar(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSucces = respuesta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _personalDAO.Eliminar(id);
            return StatusCode(StatusCodes.Status200OK, new { isSucces = respuesta });
        }
    }
}
