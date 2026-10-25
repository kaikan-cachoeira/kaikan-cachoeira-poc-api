package sptech.school.POCAPI.controller;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sptech.school.POCAPI.dto.ClimaResponse;
import sptech.school.POCAPI.model.Produto;
import sptech.school.POCAPI.repository.ProdutoRepository;
import sptech.school.POCAPI.service.ClimaService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;
    private final ClimaService climaService;

    public ProdutoController(ProdutoRepository produtoRepository, ClimaService climaService) {
        this.produtoRepository = produtoRepository;
        this.climaService = climaService;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Produto produto) {
        ClimaResponse clima;

        try {
            clima = climaService.consultarClimaSaoPaulo();
        } catch (IllegalStateException erro) {
            return ResponseEntity.status(502).body(Map.of("mensagem", erro.getMessage()));
        }

        produto.setId(null);
        produto.setTemperatura(clima.getTemperatura());
        produto.setChuva(clima.getChuva());
        produto.setCondicao(clima.getCondicao());
        produto.setReferenciaEm(clima.getReferenciaEm());
        produto.setCadastradoEm(Instant.now());
        Produto produtoSalvo = produtoRepository.save(produto);
        return ResponseEntity.status(201).body(produtoSalvo);
    }

    @GetMapping
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id).orElse(null);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto dadosProduto) {
        Produto produto = produtoRepository.findById(id).orElse(null);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        produto.setNome(dadosProduto.getNome());
        Produto produtoAtualizado = produtoRepository.save(produto);
        return ResponseEntity.ok(produtoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
