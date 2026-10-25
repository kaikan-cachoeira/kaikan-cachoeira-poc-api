package sptech.school.POCAPI.controller;

import java.util.Map;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sptech.school.POCAPI.dto.ClimaResponse;
import sptech.school.POCAPI.service.ClimaService;

@RestController
@RequestMapping("/clima")
public class ClimaController {

    private final ClimaService climaService;

    public ClimaController(ClimaService climaService) {
        this.climaService = climaService;
    }

    @GetMapping("/atual")
    public ResponseEntity<?> consultarClimaAtual() {
        try {
            ClimaResponse clima = climaService.consultarClimaSaoPaulo();
            return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(clima);
        } catch (IllegalStateException erro) {
            return ResponseEntity.status(502)
                .cacheControl(CacheControl.noStore())
                .body(Map.of("mensagem", erro.getMessage()));
        }
    }
}
