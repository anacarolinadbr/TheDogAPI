import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View,} from 'react-native'
import React, { useEffect, useState } from 'react'

interface Dog {
  id: number
  name: string
  temperament?: string
  life_span?: string
  bred_for?: string
  image?: {
    url: string;
  }
}

const CardDog = () => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [search, setSearch] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  async function buscarDogs() {
    try {
      const resposta = await fetch(
        'https://api.thedogapi.com/v1')
    if (!resposta.ok) { throw new Error('Falha')}
    const dados: Dog[] = await resposta.json()
      setDogs(dados);
    } catch {
      setError('Não foi possível listar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarDogs()
  }, [])

  const dogsFiltrados = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large"/>
        <Text>Carregando os Dogs</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Conhecendo Raças!</Text>

      <Text style={styles.subtitulo}>
        Conheça diferentes raças de cachorros!
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.containerProDog}>
        <TextInput
          style={styles.searchDog}
          placeholder="Busque uma raça"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={dogsFiltrados}
  keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (

      <View style={styles.card}>
          {item.image?.url ? (
              <Image
                source={{ uri: item.image.url }}
                style={styles.imagem}
                resizeMode="cover"
              />
            ) :(
              <View style={styles.semImagem}>
                <Text>Imagem indisponível</Text>
              </View>
            )}

            <View style={styles.informacoes}>
              <Text style={styles.nome}>{item.name}</Text>

              <Text style={styles.texto}>
                Temperamento: {item.temperament || 'Não informado'}
              </Text>

              <Text style={styles.texto}>
                Expectativa de vida: {item.life_span || 'Não informada'}
              </Text>

              <Text style={styles.texto}>
                Criado para: {item.bred_for || 'No informado'}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.error}>
            Nenhuma raça encontrada
          </Text>
        }
      />
    </View>
  )
}

export default CardDog

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B4226',
    paddingTop: 45,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#f7f5f3',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#f7f5f3',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 15,
  },

  containerProDog: {
    alignItems: 'center',
    width: '100%',
  },

  searchDog: {
    width: '92%',
    height: 45,
    borderWidth: 1,
    borderColor: '#C4A58A',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },

  lista: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8D9CA',
  },

  imagem: {
    width: '100%',
    height: 180,
    backgroundColor: '#F0E6DC',
  },

  semImagem: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0E6DC',
  },

  informacoes: {
    padding: 14,
    gap: 7,
  },

  nome: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#6B4226',
    marginBottom: 4,
  },

  texto: {
    fontSize: 14,
    color: '#51463D',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFF8F0',
  },

  error: {
    color: '#f7a8a3',
    textAlign: 'center',
    margin: 12,
  },
})
