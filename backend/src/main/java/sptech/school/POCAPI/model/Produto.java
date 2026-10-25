package sptech.school.POCAPI.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Double temperatura;

    private Double chuva;

    private String condicao;

    private Instant referenciaEm;

    private Instant cadastradoEm;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(Double temperatura) {
        this.temperatura = temperatura;
    }

    public Double getChuva() {
        return chuva;
    }

    public void setChuva(Double chuva) {
        this.chuva = chuva;
    }

    public String getCondicao() {
        return condicao;
    }

    public void setCondicao(String condicao) {
        this.condicao = condicao;
    }

    public Instant getReferenciaEm() {
        return referenciaEm;
    }

    public void setReferenciaEm(Instant referenciaEm) {
        this.referenciaEm = referenciaEm;
    }

    public Instant getCadastradoEm() {
        return cadastradoEm;
    }

    public void setCadastradoEm(Instant cadastradoEm) {
        this.cadastradoEm = cadastradoEm;
    }
}
