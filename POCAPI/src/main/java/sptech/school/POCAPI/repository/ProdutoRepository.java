package sptech.school.POCAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sptech.school.POCAPI.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
