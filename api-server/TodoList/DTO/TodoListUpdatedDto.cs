using System.Text.Json.Serialization;

namespace TodoList.DTO
{
    public class TodoListUpdatedDto 
    {
        [JsonPropertyName("id")]
        public int TodoList_ID { get; set; }
        [JsonPropertyName("title")]
        public string TITLE { get; set; } = string.Empty;
        [JsonPropertyName("content")]
        public string CONTENT { get; set; } = string.Empty;
        [JsonPropertyName("updated_date")]
        public DateTime? UPDATED_DATE { get; set; }
    }
}
