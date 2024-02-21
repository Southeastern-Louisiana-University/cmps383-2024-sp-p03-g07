using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace Selu383.SP24.Tests.Helpers;

public static class HttpClientExtensions
{

    public static async Task<T?> ReadAsJsonAsync<T>(this HttpContent content)
    {
        var dataAsString = await content.ReadAsStringAsync();

        return JsonConvert.DeserializeObject<T?>(dataAsString);
    }
}
