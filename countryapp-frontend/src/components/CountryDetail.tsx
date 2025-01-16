import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CountryDetailedInfo } from "../types";
import { api } from "../lib/api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function CountryDetail() {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<CountryDetailedInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (!countryCode) return;
      try {
        const data = await api.getCountryInfo(countryCode);
        setCountry(data);
      } catch (error) {
        console.error("Failed to fetch country info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!country) return null;

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <img
            src={country.flagUrl}
            alt={`${country.commonName} flag`}
            className="w-24 h-16 object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold">{country.commonName}</h1>
            <p className="text-muted-foreground">{country.officialName}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
            <div className="flex flex-wrap gap-2">
              {country.borders.map((border) => (
                <Link
                  key={border.countryCode}
                  to={`/country/${border.countryCode}`}
                >
                  <Button variant="secondary" size="sm">
                    {border.commonName}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Population Over Time</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={country.populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{ value: "Year", position: "bottom" }}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                    label={{
                      value: "Population",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      new Intl.NumberFormat().format(value),
                      "Population",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
