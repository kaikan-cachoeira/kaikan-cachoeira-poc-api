package sptech.school.POCAPI.service;

import java.net.http.HttpClient;
import java.time.Duration;
import java.time.Instant;

import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import sptech.school.POCAPI.dto.ClimaResponse;
import sptech.school.POCAPI.dto.OpenMeteoResponse;
import sptech.school.POCAPI.dto.OpenMeteoResponse.ClimaAtual;

@Service
public class ClimaService {

    private final RestClient restClient;

    public ClimaService() {
        HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);
        requestFactory.setReadTimeout(Duration.ofSeconds(10));

        this.restClient = RestClient.builder()
            .baseUrl("https://api.open-meteo.com")
            .requestFactory(requestFactory)
            .build();
    }

    public ClimaResponse consultarClimaSaoPaulo() {
        OpenMeteoResponse resposta;

        try {
            resposta = restClient.get()
                .uri(uriBuilder -> uriBuilder
                    .path("/v1/forecast")
                    .queryParam("latitude", "-23.5505")
                    .queryParam("longitude", "-46.6333")
                    .queryParam("current", "temperature_2m,rain,showers,weather_code")
                    .queryParam("temperature_unit", "celsius")
                    .queryParam("precipitation_unit", "mm")
                    .queryParam("timezone", "America/Sao_Paulo")
                    .queryParam("timeformat", "unixtime")
                    .build())
                .retrieve()
                .body(OpenMeteoResponse.class);
        } catch (RestClientException erro) {
            throw new IllegalStateException("Não foi possível consultar o clima de São Paulo.", erro);
        }

        ClimaAtual clima = resposta == null ? null : resposta.current();

        if (clima == null
            || clima.temperatura() == null
            || clima.chuva() == null
            || clima.pancadas() == null
            || clima.codigoTempo() == null
            || clima.horario() == null
            || !Double.isFinite(clima.temperatura())
            || !Double.isFinite(clima.chuva())
            || !Double.isFinite(clima.pancadas())) {
            throw new IllegalStateException("A Open-Meteo retornou dados incompletos ou inválidos.");
        }

        return new ClimaResponse(
            clima.temperatura(),
            clima.chuva() + clima.pancadas(),
            clima.codigoTempo(),
            descreverCondicao(clima.codigoTempo()),
            Instant.ofEpochSecond(clima.horario())
        );
    }

    private String descreverCondicao(int codigo) {
        return switch (codigo) {
            case 0 -> "Céu limpo";
            case 1 -> "Predominantemente limpo";
            case 2 -> "Parcialmente nublado";
            case 3 -> "Nublado";
            case 45 -> "Nevoeiro";
            case 48 -> "Nevoeiro com geada";
            case 51 -> "Garoa leve";
            case 53 -> "Garoa moderada";
            case 55 -> "Garoa intensa";
            case 56 -> "Garoa congelante leve";
            case 57 -> "Garoa congelante intensa";
            case 61 -> "Chuva leve";
            case 63 -> "Chuva moderada";
            case 65 -> "Chuva forte";
            case 66 -> "Chuva congelante leve";
            case 67 -> "Chuva congelante forte";
            case 71 -> "Neve leve";
            case 73 -> "Neve moderada";
            case 75 -> "Neve intensa";
            case 77 -> "Grãos de neve";
            case 80 -> "Pancadas de chuva leves";
            case 81 -> "Pancadas de chuva moderadas";
            case 82 -> "Pancadas de chuva fortes";
            case 85 -> "Pancadas de neve leves";
            case 86 -> "Pancadas de neve fortes";
            case 95 -> "Tempestade";
            case 96 -> "Tempestade com granizo leve";
            case 97 -> "Tempestade forte";
            case 99 -> "Tempestade com granizo forte";
            default -> "Condição não identificada";
        };
    }
}
