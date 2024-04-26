using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SebastianCaceres.DAO;
using SebastianCaceres.Entity;
namespace SebastianCaceres.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HijoController : ControllerBase
    {
        private readonly HijoDAO _hijoDAO;
        public HijoController(HijoDAO hijoDAO)
        {
            _hijoDAO = hijoDAO;
        }

        [HttpGet("lista/{id}")]
        public async Task<IActionResult> Lista(int id)
        {
            List<Hijo> Lista = await _hijoDAO.Lista(id);
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Hijo objeto = await _hijoDAO.Obtener(id);
            return StatusCode(StatusCodes.Status200OK, objeto);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Hijo objeto)
        {
            bool respuesta = await _hijoDAO.Crear(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSucces = respuesta });
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Hijo objeto)
        {
            bool respuesta = await _hijoDAO.Editar(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSucces = respuesta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _hijoDAO.Eliminar(id);
            return StatusCode(StatusCodes.Status200OK, new { isSucces = respuesta });
        }
    }
}
