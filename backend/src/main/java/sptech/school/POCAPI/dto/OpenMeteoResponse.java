package sptech.school.POCAPI.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OpenMeteoResponse(ClimaAtual current) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ClimaAtual(
        @JsonProperty("temperature_2m") Double temperatura,
        @JsonProperty("rain") Double chuva,
        @JsonProperty("showers") Double pancadas,
        @JsonProperty("weather_code") Integer codigoTempo,
        @JsonProperty("time") Long horario
    ) {
    }
}
