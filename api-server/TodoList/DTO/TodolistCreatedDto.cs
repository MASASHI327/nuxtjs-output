using System.Text.Json.Serialization;

namespace TodoList.DTO
{
    public class TodoListCreatedDto 
    {
        [JsonPropertyName("title")]
        public string TITLE { get; set; } = string.Empty;
        [JsonPropertyName("content")]
        public string CONTENT { get; set; } = string.Empty;
        public DateTime? CREATED_DATE { get; set; }
    }
}
