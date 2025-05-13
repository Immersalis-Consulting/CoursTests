using System.ComponentModel.DataAnnotations;

namespace music_backend_asp.Models
{
    public class Song
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Band { get; set; }
        public int IndexAlbum { get; set; }
        public string Key { get; set; }
    }
}
