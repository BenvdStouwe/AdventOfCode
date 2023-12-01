namespace AoC2023.CSharp.Extensions;

public static class StringExtensions
{
    public static string[] Parse(this string input) => input.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
}