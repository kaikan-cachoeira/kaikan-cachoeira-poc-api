package sptech.school.POCAPI.dto;

import java.time.Instant;

public class ClimaResponse {

    private final Double temperatura;
    private final Double chuva;
    private final Integer codigoTempo;
    private final String condicao;
    private final Instant referenciaEm;

    public ClimaResponse(Double temperatura, Double chuva, Integer codigoTempo,
                         String condicao, Instant referenciaEm) {
        this.temperatura = temperatura;
        this.chuva = chuva;
        this.codigoTempo = codigoTempo;
        this.condicao = condicao;
        this.referenciaEm = referenciaEm;
    }

    public Double getTemperatura() {
        return temperatura;
    }

    public Double getChuva() {
        return chuva;
    }

    public Integer getCodigoTempo() {
        return codigoTempo;
    }

    public String getCondicao() {
        return condicao;
    }

    public Instant getReferenciaEm() {
        return referenciaEm;
    }
}
