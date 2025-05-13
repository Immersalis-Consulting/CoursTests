using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using music_backend_asp.Models;

namespace music_backend_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly MusicContext _context;

        public SongsController(MusicContext context)
        {
            _context = context;
        }

        // GET: api/songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetAllSongs()
        {
            try
            {
                var songs = await _context.Songs.ToListAsync();
                return Ok(songs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/songs/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSongById(int id)
        {
            try
            {
                var song = await _context.Songs.FindAsync(id);
                if (song == null)
                {
                    return NotFound($"Song with ID {id} not found.");
                }
                return Ok(song);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/songs
        [HttpPost]
        public async Task<ActionResult<Song>> CreateSong([FromBody] Song song)
        {
            try
            {
                if (song == null)
                {
                    return BadRequest("Song is null.");
                }

                await _context.Songs.AddAsync(song);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetSongById), new { id = song.Id }, song);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/songs/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSong(int id, [FromBody] Song song)
        {
            try
            {
                if (id != song.Id)
                {
                    return BadRequest("Song ID mismatch.");
                }

                var existingSong = await _context.Songs.FindAsync(id);
                if (existingSong == null)
                {
                    return NotFound($"Song with ID {id} not found.");
                }

                existingSong.Name = song.Name;
                existingSong.Band = song.Band;
                existingSong.IndexAlbum = song.IndexAlbum;
                existingSong.Key = song.Key;

                _context.Entry(existingSong).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound("Concurrency error while updating song.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/songs/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSong(int id)
        {
            try
            {
                var song = await _context.Songs.FindAsync(id);
                if (song == null)
                {
                    return NotFound($"Song with ID {id} not found.");
                }

                _context.Songs.Remove(song);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}