namespace AoC2023Tests;

public static class StringExtensions
{
    public static string[] Parse(this string val) =>
        val.Split(Environment.NewLine, StringSplitOptions.TrimEntries);
}
